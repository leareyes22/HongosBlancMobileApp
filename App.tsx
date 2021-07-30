/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { observer } from 'mobx-react-lite';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/navigation-stack';
import { extendTheme, NativeBaseProvider } from 'native-base';
import SessionStore from './src/stores/session.store';
import StatusBar from './src/components/status/status-bar.component';

const App = () => {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#fffbeb',
        100: '#d6d3d1',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar />
      <NavigationContainer>
        <RootStack isLoggedIn={SessionStore.isLoggedIn} />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default observer(App);
