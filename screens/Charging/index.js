import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Pressable, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBolt, faBatteryFull } from '@fortawesome/free-solid-svg-icons';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectBatteryRange } from '../../slices/navSlice';


export default function ChargingScreen() {

    const batteryRange = useSelector(selectBatteryRange)


    return (
        
        <View style={styles.container}>
            <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <Entypo name="chevron-left" size={24} color="white" />
        </Pressable>
          <Image source={require('../../assets/lyriq1.png')} style={styles.backgroundImage} />
          <View style={styles.batterySection}>
            <Text style={styles.batteryText}>{batteryRange.range} km</Text>
            <Image
              source={require('../../assets/battery.png')} // Replace with your actual battery icon path
              style={styles.batteryImage}
            />
            <TouchableOpacity style={styles.chargeButton}>
              <Text style={styles.chargeButtonText}>OPEN CHARGE PORT</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.superchargerSection}>
            <Text style={styles.superchargerText}>Nearby Superchargers</Text>
            <View style={styles.superchargerList}>
              <Text style={styles.superchargerItem}>New York, NY - Mott Street 2/2 available</Text>
              <Text style={styles.superchargerItem}>New York, NY - 59 Allen Street 2/4 available</Text>
            </View>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    backgroundImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    batterySection: {
      marginTop: 120,
      alignItems: 'center',
    },
    batteryText: {
      color: '#fff',
      fontSize: 40,
      fontWeight: 'bold',
    },
    batteryImage: {
      height: 26,
      resizeMode: 'contain',
      marginVertical: 10,
    },
    chargeButton: {
      backgroundColor: 'blue',
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 20,
    },
    chargeButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    superchargerSection: {
      marginTop: 50,
      paddingHorizontal: 20,
    },
    superchargerText: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    superchargerList: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 10,
      padding: 20,
    },
    superchargerItem: {
      color: '#fff',
      fontSize: 16,
      marginBottom: 10,
    },
    back: {
        position: 'absolute',
        //top: 50,
        //left: 25,
        backgroundColor: '#2f3030',
        padding: 10,
        borderRadius: 5,
      },
  });
  