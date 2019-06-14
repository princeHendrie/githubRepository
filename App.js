/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import Router from './src/navigations/Router';
import styles from './src/values/styles';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import  reducers from './src/reducers'
import  ReduxThunk from 'redux-thunk';

export default class App extends Component {
  render() {
    const store = createStore(reducers,{}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Router />
        </View>
      </Provider>
    );
  }
}

