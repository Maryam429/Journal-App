/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Uncomment if you want to debug AsyncStorage initialization
// console.log("AsyncStorage:", AsyncStorage);

AppRegistry.registerComponent(appName, () => App);
