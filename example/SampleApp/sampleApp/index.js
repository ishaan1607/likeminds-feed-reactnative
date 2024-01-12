/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {initMyClient} from 'likeminds-feed-reactnative-integration';

const myClient = initMyClient('69edd43f-4a5e-4077-9c50-2b7aa740acce');

AppRegistry.registerComponent(appName, () => App);

export {myClient};
