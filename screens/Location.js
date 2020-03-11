import React, { Component } from "react";
import { Input, Button } from "react-native-elements";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import db from "../firebase";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView
} from "react-native";
import { Alert } from "react-native";


export default class HomeScreen extends Component {
    constructor(props) {
        super (props);
        this.state = {
            addThings: false,
            things: [],
            newThing: '',
            removing: false
        }
    }

    componentDidMount() {
        var docRef = db.collection("users").doc(firebase.auth().currentUser.uid);

        docRef.get().then(doc => {
            if (doc.exists) {
                if (doc.data()[this.props.navigation.getParam('where')]) {
                    this.setState({ things: doc.data()[this.props.navigation.getParam('where')] })
                }
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (firebase.auth().currentUser) {
            var docRef = db.collection("users").doc(firebase.auth().currentUser.uid);

            docRef.get().then(doc => {
                if (doc) {
                    if (this.state.things.length !== doc.data()[this.props.navigation.getParam('where')].length) {
                        this.setState({ things: doc.data()[this.props.navigation.getParam('where')] })
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

    addThing = () => {
        var place = this.props.navigation.getParam('where')
        db.collection('users').doc(firebase.auth().currentUser.uid).update({
            [place]: firebase.firestore.FieldValue.arrayUnion(this.state.newThing)
        })

        this.setState({addThings: !this.state.addThings})
    }

    deleter = (i) => {

        var userRef = db.collection('users').doc(firebase.auth().currentUser.uid)
        var deleted = this.state.things[i]
        try {
            userRef.update({ [this.props.navigation.getParam('where')]: firebase.firestore.FieldValue.arrayRemove(deleted) })
            this.setState({ removing: !this.state.removing })
        } catch (error) {
            console.log(error)
        }

    }



    deleteThing = (i) => {

 
        Alert.alert(
            'Delete Item?',
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
    
    backy = () => {
        this.props.navigation.navigate("Home");

    }
    
    toggleAdd = () => {
        this.setState({ addThings: !this.state.addThings })
    }

    cheggit = () => {
        console.log(this.props.navigation.getParam('where'))
        console.log(this.state.things)
    }


    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.bgImage}
                    source={require("../assets/thingsbg.jpg")}
                >

                        

                <View style={styles.buttons}>
                        <Text style={styles.text}>T H I N G S</Text>

        <Text style={styles.text}>Add something to {this.props.navigation.getParam('where')} ?</Text>
                        <TouchableOpacity>
                            <MaterialIcons
                                name="add-circle"
                                style={styles.add}
                                onPress={this.toggleAdd}
                            />
                        </TouchableOpacity>

                        <View>

                        {this.state.addThings ? (
                        <View style={{ flexDirection: 'row', width: 250, justifyContent: 'center', marginRight: 10 }}>
                            <Input
                                inputStyle={{ marginLeft: 10, color: "white", width: 30, alignContent: 'center' }}
                                containerStyle={{ marginVertical: 10 }}
                                onChangeText={newThing => this.setState({ newThing })}
                                placeholder="Add Thing"
                                autoCapitalize="none"
                                placeholderTextColor="white"
                            />
                            <TouchableOpacity>
                                <Button
                                    onPress={this.addThing}
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

                    <View style={styles.things}>
                        <ScrollView>
                            {this.state.things
                                ? this.state.things.map((thing, i) => (
                                    <View style={styles.moreThings}
                                        key={i}>
                                        <Text
                                            style={{
                                                backgroundColor: 'rgba(153, 153, 153, 0.5)',
                                                marginBottom: 10,
                                                fontSize: 25,
                                                borderRadius: 13,
                                                justifyContent: 'center',
                                                textAlign: 'center',
                                                marginLeft: 80,
                                                overflow: "hidden",
                                                paddingLeft: 30,
                                                paddingRight: 30,
                                                width: 250
                                            }}
                                        >
                                            {thing}
                                        </Text>
                                        <Ionicons style={{marginLeft: 15}}name='ios-remove-circle' size={30} color='red' onPress={ () => this.deleteThing(i)} />
                                        <Ionicons style={{marginLeft: 15}}name ='ios-arrow-forward' size={30} color='blue'/>
                                    </View>
                                    
                                ))
                                : null}
                        </ScrollView>
                    </View>

                    <View style={styles.back}>
                        <TouchableOpacity>
                            <Ionicons name='ios-arrow-back' size={32} color='green' onPress={this.backy} />
                        </TouchableOpacity>

                    </View>

                </ImageBackground>
            </View>
        );
    }

}
const styles = StyleSheet.create({
bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: 420
},

    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

buttons: {
    flex: 0.5,
    paddingTop: 75,
    alignItems: 'center'
},
    things: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    moreThings:{
        flexDirection: 'row'
    },
    text: {
        color: 'white',
        textShadowColor: 'red',
        textShadowRadius: 3,
        fontSize: 20,
        alignItems: 'center',
        marginLeft: 3
    },
    back: {
        flex: 0.4 ,
        justifyContent: 'center',
        alignItems: 'center'
    },
    add: {
        fontSize: 40,
        alignItems: "center",
        textShadowColor: "orange",
        textShadowRadius: 30,
        textShadowOffset: { width: 3, height: 25 }
    }
})


