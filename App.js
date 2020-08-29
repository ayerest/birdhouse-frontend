import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import AppNavigator from './navigation/AppNavigator';
import { useScreens } from 'react-native-screens';
import ReduxThunk from 'redux-thunk';
import entriesReducer from './store/reducers/entries';
import birdsReducer from './store/reducers/birds';
import authReducer from './store/reducers/auth';
import badgesReducer from './store/reducers/badges'
import {Provider} from 'react-redux';
import photosReducer from './store/reducers/photos';
import stepsReducer from './store/reducers/steps';
import audioReducer from './store/reducers/audio';
import factoidsReducer from './store/reducers/factoids';
import locationReducer from './store/reducers/location';

useScreens();

const rootReducer = combineReducers({
  entries: entriesReducer,
  birds: birdsReducer,
  user: authReducer,
  badges: badgesReducer,
  photos: photosReducer,
  steps: stepsReducer,
  audio: audioReducer,
  factoids: factoidsReducer,
  location: locationReducer,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => setLoadingComplete(true)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/SightingsBronze.png'),
      require('./assets/images/BirdsBronze.png'),
      require('./assets/images/SightingsSilver.png'),
      require('./assets/images/BirdsSilver.png'),
      require('./assets/images/SightingsGold.png'),
      require('./assets/images/BirdsGold.png'),
      require('./assets/images/StepsBronze.png'),
      require('./assets/images/StepsSilver.png'),
      require('./assets/images/StepsGold.png'),
      require('./assets/images/birdicon.png'),
      require('./assets/images/LoginGold.png'),
      require('./assets/images/LoginSilver.png'),
      require('./assets/images/LoginBronze.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      // ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'Roboto-Condensed': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
      'Fred-Great': require('./assets/fonts/FrederickatheGreat-Regular.ttf')
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
