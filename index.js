/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

AppRegistry.registerComponent(appName, () => App);

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'android',
});

PushNotification.createChannel({
  channelId: 'hongosblanc-channel-id', // (required)
  channelName: 'Hongos Blanc mobile app notifications channel', // (required)
  channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
  playSound: true, // (optional) default: true
  soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  importance: 4, // (optional) default: 4. Int value of the Android notification importance
  vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
});
