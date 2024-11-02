import { View, Text, Image, StyleSheet, Pressable, ImageBackground } from 'react-native';
import climateImage from '../../assets/climate.png';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import {app, db} from './../../firebase'
import { ref, set} from 'firebase/database'
import { selectConnectedDevice } from '../../slices/navSlice';
import { writeToBleServer } from '../../constants/constants';
import { selectVent, setVent } from '../../slices/navSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectInteriorTemp, setInteriorTemp } from '../../slices/navSlice';

const ClimateScreen = ({navigation}) => {
 
  const dispatch = useDispatch()
  const connectedDevice = useSelector(selectConnectedDevice)
  const temperature = useSelector(selectInteriorTemp)
  const [on, setOn] = useState(false);
  const venting = useSelector(selectVent)

  useEffect(() => {
    writeTemperature(temperature, on)
  }, [on, temperature])


  function writeTemperature(temp, on){
    const reference = ref(db, 'temperature')
    set(reference, {
        on: on,
        temp: temp
    })
    if (connectedDevice != null){
      writeToBleServer(connectedDevice, temp.toString())
    }
    
  }

  return (
    <ImageBackground source={{uri: 'https://wallpaperaccess.com/full/1734423.jpg'}} resizeMode='cover' style={{flex: 1, justifyContent: 'center'}}>
    <View style={styles.container}>
      <Image source={require('../../assets/lyriq_top.png')} style={styles.image} resizeMode="cover" />

      <Pressable onPress={() => navigation.goBack()} style={styles.back}>
        <Entypo name="chevron-left" size={24} color="white" />
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.label}>Interior {temperature} - Exterior 12°C</Text>

        <View style={styles.controlsRow}>
          <Pressable
            onPress={() => setOn(!on)}
            style={styles.iconButtonContainer}
          >
            <MaterialCommunityIcons
              name="power"
              size={42}
              color={on ? 'white' : 'gray'}
            />
            <Text style={styles.iconButtonText}>{on ? 'Off' : 'On'}</Text>
          </Pressable>

          <View style={styles.temperatureContainer}>
            <Entypo
              onPress={() => dispatch(setInteriorTemp(temperature-1))}
              disabled={!on}
              name="chevron-left"
              size={30}
              color="gray"
            />
            <Text style={{fontSize: 48,
                fontWeight: '300',
                color: on? 'white' : 'gray',
                marginHorizontal: 20,
              }}>{temperature}°C</Text>
            <Entypo
              onPress={() => dispatch(setInteriorTemp(temperature + 1))}
              disabled={!on}
              name="chevron-right"
              size={30}
              color="gray"
            />
          </View>

          <View style={styles.iconButtonContainer}>
            <Pressable onPress={() => dispatch(setVent((!venting)))}>
              <MaterialCommunityIcons name="car-door" size={42} color={venting ? 'white' : 'gray'} />
          <Text style={{
          color: venting ? 'white' : 'gray',
          fontSize: 18,
          fontWeight: '600',
          marginTop: 10,
        }}>{venting? 'Close' : 'Vent'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
    </ImageBackground>
  );
};

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
    width: '100%',
    height: '75%',
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
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
});

export default ClimateScreen;