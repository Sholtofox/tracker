import React, { Component } from "react";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Location from './Location'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,

} from 'react-native';
import { Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import db from "../firebase";


export default class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addPlace: false,
            newPlace: '',
            places: [],
            removing: false
        }
    }
    componentDidMount() {
        var docRef = db.collection("users").doc(firebase.auth().currentUser.uid);

        docRef.get().then(doc => {
            if (doc.exists) {
                this.setState({places: doc.data().places})
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

    }

    componentDidUpdate(prevProps, prevState) {
        if(firebase.auth().currentUser) {
        var docRef = db.collection("users").doc(firebase.auth().currentUser.uid);

        docRef.get().then(doc => {
            if (doc) {
              if (this.state.places.length !== doc.data().places.length) {
                this.setState({ places: doc.data().places })
                console.log('DOCDATA', doc.data())
              }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        })
      }
        else {
            null
        }

    }


    locationNavigate = (event) => {
        this.props.navigation.navigate("Location", {where: this.state.places[event]})
    }
    
    signOutUser = () => {
        firebase.auth().signOut();
        Alert.alert('Logged Out')
    };
    
    addNewPlace = () => {
      db.collection('users').doc(firebase.auth().currentUser.uid).update({
        places: firebase.firestore.FieldValue.arrayUnion(this.state.newPlace)
      })

      var newPlace = this.state.newPlace
      var docData = {
        [newPlace]: [],
      };

      db.collection('users').doc(firebase.auth().currentUser.uid).set(docData,
      {merge: true})
        this.setState({ addPlace: !this.state.addPlace })

        console.log('in add new place', this.state.places)
    }

  deleter = (i) => {
    console.log('before', this.state.places)
    var userRef = db.collection('users').doc(firebase.auth().currentUser.uid)
    var deleted = this.state.places[i]
    try {
      userRef.update({[deleted]: firebase.firestore.FieldValue.delete()}).then(
        userRef.update({places: firebase.firestore.FieldValue.arrayRemove(deleted)})
      )
 
      this.setState({ removing: !this.state.removing })
    } catch (error) {
      console.log(error)
    }
    console.log('after', this.state.places)

  }

  deletePlace = (i) => {

    Alert.alert(
      'Delete Place?',
      'Are you sure?',
      [

        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => this.deleter(i) },
      ],
      { cancelable: false },
    );
  }

    toggleAdd =() => {
        this.setState({addPlace: !this.state.addPlace})
    }


    render() {
        return (
          <View style={styles.container}>
            <ImageBackground
              style={styles.bgImage}
              source={require("../assets/img2.png")}
            >
              <View style={styles.header}>
                <Text style={styles.text}>P L A C E S</Text>
                        <View style={styles.places}>
                            <Text style={styles.text}>Add A New Place</Text>
                            <TouchableOpacity>
                                <MaterialIcons
                                    name="add-circle"
                                    style={styles.add}
                                    onPress={this.toggleAdd}
                                />
                            </TouchableOpacity>
                            <View >
                                {this.state.addPlace ? (
                                    <View style={{ flexDirection: 'row', width: 250, justifyContent: 'center', marginRight: 10 }}>
                                            <Input
                                                inputStyle={{ marginLeft: 10, color: "white", width: 30, alignContent: 'center' }}
                                                containerStyle={{ marginVertical: 10 }}
                                                onChangeText={newPlace => this.setState({ newPlace })}
                                                placeholder="Add Place"
                                                autoCapitalize="none"
                                                placeholderTextColor="white"
                                            />
                                            <TouchableOpacity>
                                                <Button
                                                    onPress={this.addNewPlace}
                                                    title="SUBMIT"
                                                    activeOpacity={1}
                                                    underlayColor="transparent"
                                                    buttonStyle={{
                                                        height: 50,
                                                        width: 150,
                                                        backgroundColor: "transparent",
                                                        borderWidth: 2,
                                                        borderColor: "white",
                                                        borderRadius: 30
                                                    }}
                                                    containerStyle={{ marginVertical: 1 }}
                                                    titleStyle={{ fontWeight: "bold", color: "white" }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                ) : null}
                            </View>
                        </View>
              </View>

              <View style={styles.locations}>
                <ScrollView>
                  {this.state.places
                    ? this.state.places.map((place, i) => (
                      <View key={i} style={styles.moreThings}>
                        <Text
                            onPress={() => this.locationNavigate(i)}                      
                          style={{
                            backgroundColor: 'rgba(153, 153, 153, 0.5)',
                            marginBottom: 10,
                            fontSize: 25,
                            borderRadius: 13,
                            justifyContent: 'center',
                            alignContent: 'center',
                            marginLeft: 80,
                            overflow: "hidden",
                            paddingLeft: 30,
                            paddingRight: 30,
                            width: 250
                          }}
                        >
                          {place}
                        </Text>
                        <Ionicons style={{ marginLeft: 15 }} name='ios-remove-circle' size={30} color='red' onPress={() => this.deletePlace(i)} />
                        <Ionicons style={{ marginLeft: 15 }} name='ios-arrow-forward' size={30} color='blue' />
                      </View>
                      ))
                    : null}
                </ScrollView>
              </View>


              <View style={styles.logout}>
                <TouchableOpacity>
                  <Button
                    onPress={this.signOutUser}
                    title="Log Out"
                    activeOpacity={1}
                    underlayColor="transparent"
                    buttonStyle={{
                      height: 50,
                      width: 150,
                      backgroundColor: "transparent",
                      borderWidth: 4,
                      borderColor: "white",
                      borderRadius: 30,
                      justifyContent: "center",
                      alignContent: "center"
                    }}
                    containerStyle={{ marginVertical: 10 }}
                    titleStyle={{ fontWeight: "bold", color: "black" }}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        );
    }

}

const styles = StyleSheet.create({
    bigplace: {
        justifyContent: 'flex-start'
    },
    logout: {
        flex: 0.25,
        alignItems: 'center',
        marginBottom: 30,
        justifyContent: 'center'
    },
  moreThings: {
    flexDirection: 'row'
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: 420
  },
  locations: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
      flex: 0.5,
      paddingTop: 75,
    alignItems: 'center'
  },
  places: {
    color: "white",
    fontSize: 40,
    justifyContent: "center",
    alignItems: "center",
    textShadowColor: "orange",
    textShadowRadius: 30
  },
  text: {
      color: 'white',
      textShadowColor: 'red',
      textShadowRadius: 3,
      fontSize: 20
  },
  add: {
    fontSize: 40,
    alignItems: "center",
    textShadowColor: "orange",
    textShadowRadius: 30,
    textShadowOffset: { width: 3, height: 25 }
  },
  
  individual: {
      fontSize: 30,
      color: 'white',
      backgroundColor: 'grey',
      borderRadius: 3,
    flexDirection: 'column'
  }
});
