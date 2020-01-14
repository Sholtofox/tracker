import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Input, Button, Icon } from 'react-native-elements'
import { Alert, Image, TouchableHighlight } from 'react-native'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Dimensions
} from "react-native";
import db from "../firebase";

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        signingUp: false,
        errorMessage: null
    }

    toggleSignUp = () => {
        this.setState({ signingUp: !this.state.signingUp })
    }

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => {
                const collection = db.collection("users");

                collection.doc(user.user.uid).set(
                    {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        places: []
                    },
                    { merge: true }
                );
            })
            .catch(error => this.setState({ errorMessage: error.message }));
    };
    handleLogin = () => {
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => this.setState({ errorMessage: error.message }));
    };
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.bgImage}
                    source={require('../assets/img.jpg')}
                >
                    {this.state.signingUp ? (
                        <View style={styles.loginForms}>
                            <View style={styles.errorMessage}>
                                {this.state.errorMessage ? (
                                    <Text style={styles.error}>{this.state.errorMessage}</Text>
                                ) : (
                                        <View />
                                    )}
                            </View>
                            <Input
                                leftIcon={
                                    <Icon
                                        name="user-o"
                                        type="font-awesome"
                                        color="white"
                                        size={25}
                                    />
                                }
                                inputStyle={{ marginLeft: 10, color: "white" }}
                                containerStyle={{ marginVertical: 10 }}
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                                placeholder="Email"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor="white"
                            />
                            <Input
                                leftIcon={
                                    <Icon
                                        name="lock"
                                        type="font-awesome"
                                        color="white"
                                        size={25}
                                    />
                                }
                                inputStyle={{ marginLeft: 10, color: "white" }}
                                containerStyle={{ marginVertical: 10 }}
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                                placeholder="Password"
                                secureTextEntry={true}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor="white"
                            />
                            <Input
                                leftIcon={
                                    <Icon
                                        name="user-o"
                                        type="font-awesome"
                                        color="white"
                                        size={25}
                                    />
                                }
                                inputStyle={{ marginLeft: 10, color: "white" }}
                                containerStyle={{ marginVertical: 10 }}
                                onChangeText={firstName => this.setState({ firstName })}
                                value={this.state.firstName}
                                placeholder="firstName"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor="white"
                            />
                            <Input
                                leftIcon={
                                    <Icon
                                        name="lock"
                                        type="font-awesome"
                                        color="white"
                                        size={25}
                                    />
                                }
                                inputStyle={{ marginLeft: 10, color: "white" }}
                                containerStyle={{ marginVertical: 10 }}
                                onChangeText={lastName => this.setState({ lastName })}
                                value={this.state.lastName}
                                placeholder="LastName"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor="white"
                            />

                            <TouchableOpacity onPress={this.handleSignUp}>
                                <Button
                                    onPress={this.handleSignUp}
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
                                    containerStyle={{ marginVertical: 10 }}
                                    titleStyle={{ fontWeight: "bold", color: "white" }}
                                />
                            </TouchableOpacity>
                            <View style={styles.footerView}>
                                <Text style={{ color: "white" }}>Already have an account?</Text>
                                <TouchableOpacity >
                                    <Button
                                        onPress={this.toggleSignUp}
                                        title="SignUp"
                                        type="clear"
                                        activeOpacity={0.5}
                                        titleStyle={{ color: "white", fontSize: 15 }}
                                        containerStyle={{ marginTop: -10 }}
                                    />
                                </TouchableOpacity>

                            </View>
                        </View>
                    )
                        : (
                            <View style={styles.loginForms}>
                                <View style={styles.errorMessage}>
                                    {this.state.errorMessage ? (
                                        <Text style={styles.error}>{this.state.errorMessage}</Text>
                                    ) : (
                                            <View />
                                        )}
                                </View>
                                <Input
                                    leftIcon={
                                        <Icon
                                            name="user-o"
                                            type="font-awesome"
                                            color="white"
                                            size={25}
                                        />
                                    }
                                    inputStyle={{ marginLeft: 10, color: "white" }}
                                    containerStyle={{ marginVertical: 10 }}
                                    onChangeText={email => this.setState({ email })}
                                    value={this.state.email}
                                    placeholder="Email"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholderTextColor="white"
                                />
                                <Input
                                    leftIcon={
                                        <Icon
                                            name="lock"
                                            type="font-awesome"
                                            color="white"
                                            size={25}
                                        />
                                    }
                                    inputStyle={{ marginLeft: 10, color: "white" }}
                                    containerStyle={{ marginVertical: 10 }}
                                    onChangeText={password => this.setState({ password })}
                                    value={this.state.password}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholderTextColor="white"
                                />
                                <TouchableOpacity >
                                    <Button
                                        onPress={this.handleLogin}
                                        title="Login"
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
                                        containerStyle={{ marginVertical: 10 }}
                                        titleStyle={{ fontWeight: "bold", color: "white" }}
                                    />
                                </TouchableOpacity>
                                <View style={styles.footerView}>
                                    <Text style={{ color: "white" }}>Don't have an account?</Text>
                                    <TouchableOpacity >
                                        <Button
                                            onPress={this.toggleSignUp}
                                            title="Sign Up"
                                            type="clear"
                                            activeOpacity={0.5}
                                            titleStyle={{ color: "white", fontSize: 15 }}
                                            containerStyle={{ marginTop: -10 }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        )}
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        width: 420
    },
    container: {
        flex: 1
    },
    loginForms: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300
    },
    error: {
        color: "white"
    }
})