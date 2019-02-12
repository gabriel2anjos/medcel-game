import { AppRegistry } from 'react-native';
import App from './App.js';
if (__DEV__) {
    require('react-devtools');
  }
AppRegistry.registerComponent('medcel_game', () => App);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent('ViroSample', () => App);
