/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'RCTBridge required dispatch_sync to load REAModule',
  'Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle',
  'source.uri should not be an empty string',
  'useEffect must not return anything besides a function, which is used for clean-up',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release',
  "The object notation for `createSlice.extraReducers` is deprecated, and will be removed in RTK 2.0. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice",
  'Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer',
  'Network request failed',
]);
AppRegistry.registerComponent(appName, () => App);
