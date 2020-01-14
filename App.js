import React, { useState } from 'react';
import AppNavigator from './navigation/AppNavigator';
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

export default function App() {

  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});


