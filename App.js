import { StatusBar } from 'expo-status-bar';
import React from 'react';
import CarItem from './components/CarItem/index'
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HomePage from './screens/HomePage';
import ClimateScreen from './screens/ClimateControl';
import  LocationScreen from './screens/Location';
import ControlsScreen from './screens/Controls';
import ChargingScreen from './screens/Charging';
import { Provider } from 'react-redux';
import {store} from './store'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false, 
            animationEnabled: true, 
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            gestureDirection: 'vertical'
            }} initialRouteName='Home'>
            <Stack.Screen name='Home' component={HomePage}></Stack.Screen>
            <Stack.Screen name='Climate' component={ClimateScreen}></Stack.Screen>
            <Stack.Screen name='Location' component={LocationScreen}></Stack.Screen>
            <Stack.Screen name='Controls' component={ControlsScreen}></Stack.Screen>
            <Stack.Screen name='Charging' component={ChargingScreen}></Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
