/**
 * React Native App
 * Everything starts from the Entry-point
 */
import React from 'react';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import Navigator from './navigation';
import {store} from './store/store';

interface IState {}

const RootNavigation: React.FC = () => {
  return (
    <PaperProvider>
      <Navigator/>
    </PaperProvider>
  );
};

const EntryPoint: React.FC = () => {
  return (
    <Provider store={store}>
        <RootNavigation />
    </Provider>
  );
};

export default EntryPoint;
