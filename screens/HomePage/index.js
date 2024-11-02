import { StatusBar } from 'expo-status-bar';
import React from 'react';
import CarItem from '../../components/CarItem/index'
import { StyleSheet, Text, View } from 'react-native';
import useBLE from './../../useBLE'

export default function HomePage({navigation}) {
  
  return (
    <View style={styles.container}>
      <CarItem navigation={navigation}/>
      <StatusBar style="auto" />
    </View>
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