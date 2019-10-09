/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image
} from 'react-native';


import {createStore, combineReducers} from 'redux'
import entriesReducer from './store/reducers/entries'
import { Provider } from 'react-redux'
import Home from './src/containers/Home'


const rootReducer = combineReducers({
  entries: entriesReducer
})
const store = createStore(rootReducer);

const App = () => {

    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
}
    
      

export default App;
