import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoadingScreen from '../screens/Loading'
import Login from '../screens/Login'
import HomeScreen from '../screens/HomeScreen'
import Location from '../screens/Location'
export default createAppContainer(
    createSwitchNavigator({
        Location: Location,
        Loading: LoadingScreen,
        Login: Login,
        Home: HomeScreen
    },
        { initialRouteName: 'Loading' })
);
