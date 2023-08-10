import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {Provider} from 'react-redux';
import {store} from './src/redux';
import {Listing} from './src/containers/Products/Listing';
import {Cart} from './src/containers/Products/Cart';

const Stack = createNativeStackNavigator();

export enum SCREEN_NAMES {
  LISTING = 'Listing',
  CART = 'Cart',
}

type RootStackParamList = {
  Listing: undefined;
  Cart: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={SCREEN_NAMES.LISTING} component={Listing} />
            <Stack.Screen name={SCREEN_NAMES.CART} component={Cart} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
