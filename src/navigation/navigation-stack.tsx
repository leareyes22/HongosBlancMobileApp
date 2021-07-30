import React, { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import LoginScreen from '../screens/login/login.screen';
import TabBar from './tab-bar';

//const AppStackNav = createNativeStackNavigator();
const AuthStackNav = createStackNavigator();
const RootStackNav = createStackNavigator();

const AppStack = () => {
  return <TabBar />;
};

const AuthStack = () => {
  return (
    <AuthStackNav.Navigator initialRouteName="Login">
      <AuthStackNav.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
    </AuthStackNav.Navigator>
  );
};

const RootStack = (props: any) => {
  return (
    <RootStackNav.Navigator>
      {props.isLoggedIn ? (
        <Fragment>
          <RootStackNav.Screen
            options={{ headerShown: false }}
            name="App"
            component={AppStack}
          />
        </Fragment>
      ) : (
        <>
          <RootStackNav.Screen
            options={{ headerShown: false }}
            name="Auth"
            component={AuthStack}
          />
        </>
      )}
    </RootStackNav.Navigator>
  );
};

export default RootStack;
