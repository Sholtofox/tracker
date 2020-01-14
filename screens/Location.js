import React, { Component } from "react";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from "react-native";
import { Alert } from "react-native";


export default class HomeScreen extends Component {
    constructor(props) {
        super (props);
    }
    

    backy = () => {
        this.props.navigation.navigate("Home");

    }


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>
                    In here
                </Text>
                <Button
                    onPress={this.backy}
                    title="Back"
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
                    titleStyle={{ fontWeight: "bold", color: "black" }}
                />
            </View>
        );
    }

}
