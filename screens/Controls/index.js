import React from 'react'
import { View, Text, Image, StyleSheet, Pressable, ImageBackground } from 'react-native';
import climateImage from '../../assets/climate.png';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';
import { useSelector, useDispatch } from 'react-redux';
import { selectConnectedDevice, selectDriveStatus, selectPoweredOn, setPoweredOn, setVent, selectVent, selectBatteryRange } from '../../slices/navSlice';
import { writeToBleServer } from '../../constants/constants';


export default function ControlsScreen({navigation}) {
    const dispatch = useDispatch()
    const powerOn = useSelector(selectPoweredOn)
    const [honk, setHonk] = useState(false)
    const [flash, setFlash] = useState(false)
    const venting = useSelector(selectVent)
    const [defrost, setDefrost] = useState(false)
    const [soundAlarm, setSoundAlarm] = useState(false)
    const [trunkOpen, setTrunkOpen] = useState(false)
    const [lightsOn, setLightsOn] = useState(false)
    const [limit, setLimit] = useState(80)
    const batteryRange = useSelector(selectBatteryRange)
    const driveStatus = useSelector(selectDriveStatus)
    const connectedDevice = useSelector(selectConnectedDevice)


    useEffect(() => {
      if (connectedDevice != null){
        writeToBleServer(connectedDevice, limit.toString())
      }
    }, [limit])
    

    function roundToNearestTeenth(number) {
      return Math.round(number * 100) / 100;
    }
    

    const WhiteHorizontalLine = () => {
    

    return (
        <View
        style={{
            borderBottomColor: 'white',
            borderBottomWidth: 5,
            marginVertical: 10, // Adjust this value to change the vertical space around the line
        }}
        />
    );
    };

    

    
  return (
<ImageBackground source={{uri: 'https://wallpaperaccess.com/full/1734423.jpg'}} resizeMode='cover' style={{flex: 1, justifyContent: 'center'}}>
    <View style={styles.container}>
        <View style={styles.batterySection}>
                <Image
                    source={require("../../assets/battery.png")}
                    style={styles.batteryImage}
                />
                <Text style={styles.batteryText}>{batteryRange.range} km</Text>
            </View>
            {/* Status */}
            <View style={styles.status}>
                <Text style={styles.statusText}>{`${driveStatus.status}-${connectedDevice?.name? connectedDevice.name : 'No Vehicle Connected'}`}</Text>
            </View>
           
            <View style={styles.limit}>
            <Text style={styles.limitText}>Charge limit: {roundToNearestTeenth(limit)}% {`(${roundToNearestTeenth((limit/100) * 512)}km)`}</Text>

            
            <Slider
              
              value={limit}
              onValueChange={(value) => setLimit(value)}
              onSlidingComplete={(value) => setLimit(value)}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="green"
              maximumTrackTintColor="black"
              />
            

            <Text style={styles.limitState}>2 kWh added during last charging session</Text>

            <View style={styles.voltage}>
                <Text style={styles.amount}>48 A</Text>
            </View>
          </View>
      
      <View style={{marginBottom: "110%"}}>
          <Image source={require('../../assets/controls2.png')} style={styles.image} resizeMode="contain" />
      </View>
          

      <Pressable onPress={() => navigation.goBack()} style={styles.back}>
        <Entypo name="chevron-left" size={24} color="white" />
      </Pressable>

      <View style={styles.footer}>

        <View style={styles.controlsRow}>
        <Pressable
            onPress={() => defrost? setDefrost(false) : setDefrost(true)}
            style={styles.iconButtonContainer}
          >
            <MaterialCommunityIcons
              name="car-defrost-rear"
              size={38}
              color={defrost? 'white' : 'gray'}
            />
            <Text style={styles.iconButtonText}>Defrost</Text>
        </Pressable>

        <Pressable
            onPress={() => setSoundAlarm(!soundAlarm)}
            style={styles.iconButtonContainer}
          >
            <MaterialCommunityIcons
              name="alarm-light-outline"
              size={38}
              color={soundAlarm? 'white' : 'gray'}
            />
            <Text style={styles.iconButtonText}>{soundAlarm? 'Stop Alarm' : 'Sound Alarm'}</Text>
        </Pressable>

        <Pressable
            onPress={() => trunkOpen? setTrunkOpen(false) : setTrunkOpen(true)}
            style={styles.iconButtonContainer}
          >
            <MaterialCommunityIcons
              name="car-back"
              size={38}
              color={trunkOpen? 'white' : 'gray'}
            />
            <Text style={styles.iconButtonText}>{trunkOpen? 'Close Trunk' : 'Open Trunk'}</Text>
        </Pressable>

        <Pressable
            onPress={() => setLightsOn(!lightsOn)}
            style={styles.iconButtonContainer}
          >
            <MaterialCommunityIcons
              name="car-parking-lights"
              size={38}
              color={lightsOn? 'white' : 'gray'}
            />
            <Text style={styles.iconButtonText}>{lightsOn? 'Stop Lights' : 'Start Lights'}</Text>
        </Pressable>
        </View>

        {WhiteHorizontalLine()}

        <View style={styles.controlsRow}>
          <Pressable
            onPress={() => dispatch(setPoweredOn((!powerOn)))}
            style={styles.iconButtonContainer}
          >
            <MaterialCommunityIcons
              name="power"
              size={38}
              color={powerOn? 'white' : 'gray'}
            />
            <Text style={styles.iconButtonText}>{powerOn? 'Power Off' : 'Power On'}</Text>

          </Pressable>
          <Pressable
            onPress={() => dispatch(setVent((!venting)))}
            style={styles.iconButtonContainer}
          >
          <MaterialCommunityIcons
              name={'car-door'}
              size={38}
              color={venting? 'white' : 'gray'}
            />
            <Text style={styles.iconButtonText}>{venting ? 'Close' : 'Vent'}</Text>
        </Pressable>

        <Pressable
            onPress={() => setFlash(!flash)}
            style={styles.iconButtonContainer}
          >
          <MaterialCommunityIcons
              name="car-light-high"
              size={38}
              color={flash? 'white' : 'gray'}
            />
            <Text style={styles.iconButtonText}>{flash ? "Stop Flashing" : "Flash Lights"}</Text>
        </Pressable>


        <Pressable onPressIn={() => setHonk(true)} onPressOut={() => setHonk(false)}>
            <MaterialCommunityIcons name="bugle" size={38} color={honk? 'white' : 'gray'} />
            <Text style={styles.iconButtonText}>Honk</Text>
            </Pressable>
        </View>
      </View>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#161818',
    },
    back: {
      position: 'absolute',
      top: 50,
      left: 25,
      backgroundColor: '#2f3030',
      padding: 10,
      borderRadius: 5,
    },
    image: {
        
      width:  "100%",
      height: '100%',
      marginLeft: "0%",
      marginTop: '-35%',
      marginBottom: '80%'
      
      //resizeMode: 'contain'
    
    },
    footer: {
      alignItems: 'center',
      padding: 12,
      marginBottom: 20,
      marginTop: 'auto',
    },
    label: {
      color: 'gray',
      fontSize: 18,
      fontWeight: '600',
      marginVertical: 20,
    },
    controlsRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      
    },
    temperatureContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    temperatureText: {
      fontSize: 48,
      fontWeight: '300',
      color: 'white',
      marginHorizontal: 20,
    },
    iconButtonContainer: {
      alignItems: 'center',
    },
    iconButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
      marginTop: 15,
      
    },
    batterySection: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15%"
    },
    batteryImage: {
        height: 26,
        width: 70,
        marginRight: 12
    },
    batteryText: {
        color: "white",
        fontSize: 35,
        fontWeight: "bold"
    },
    status: {
        alignItems: "center",
        marginBottom: "5%",
        marginTop: "5%"
    },
    statusText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold"
    },
    hotbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
    },
    limit: {
        width: "80%",
        minHeight: "15%",
        borderRadius: 5,
        backgroundColor: "#2c2d2f",
        marginBottom: 10,
        padding: 20,
        marginLeft: "10%"
    },
    limitText: {
        color: "white",
        fontSize: 15,
        fontWeight: 'bold'
    },
    slider: {
        marginTop: 10,
        marginBottom: 10,
    },
    limitState: {
        color: "#888a90",
        fontSize: 15,
        marginBottom: 10,
    },
    voltage: {
        backgroundColor: "#45464a",
        width: "100%",
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    amount: {
        color: "white",
        fontSize: 16,
    },
  });