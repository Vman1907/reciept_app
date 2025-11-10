/**
 * @format
 */

import {Buffer} from 'buffer';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';

global.Buffer = Buffer;

AppRegistry.registerComponent(appName, () => App);
