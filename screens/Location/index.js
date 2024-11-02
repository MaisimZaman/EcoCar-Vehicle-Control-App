import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Pressable, Image, TouchableOpacity, Platform, Linking } from "react-native"
import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react'
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { useSelector, useDispatch } from 'react-redux'
import { selectCarLocation, setCarLocation, setMyLocation, selectMyLocation, selectConnectedDevice  } from '../../slices/navSlice'
import * as Location from 'expo-location';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { calculateDistance } from "./helperFunctions"
import { ref, set, getDatabase, onValue} from 'firebase/database'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { selectDriveStatus } from '../../slices/navSlice';
import { SERVICE_ID, CHAR_ID, writeToBleServer } from '../../constants/constants';


export default function LocationScreen({navigation}) {
  const dispatch = useDispatch()
  const carLocation = useSelector(selectCarLocation)
  const myLocation = useSelector(selectMyLocation)
  const driveStatus = useSelector(selectDriveStatus)
  const connectedDevice = useSelector(selectConnectedDevice)
  const speed = 0
  const mapCustomStyle = [ { "elementType": "geometry", "stylers": [ { "color": "#242f3e" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#746855" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#242f3e" } ] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [ { "color": "#d59563" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#d59563" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#263c3f" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#6b9a76" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#38414e" } ] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "color": "#212a37" } ] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "color": "#9ca5b3" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#746855" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#1f2835" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#f3d19c" } ] }, { "featureType": "transit", "elementType": "geometry", "stylers": [ { "color": "#2f3948" } ] }, { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [ { "color": "#d59563" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#17263c" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#515c6d" } ] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [ { "color": "#17263c" } ] } ]
  const distance = calculateDistance(myLocation.coords?.latitude, myLocation.coords?.longitude, carLocation[0], carLocation[1]).toFixed(2)
  const diff_const = 0.00003710804
  const [compass, setCompass] = useState({})
  const [holdForward, setHoldForward] = useState(false)
  const [holdBackward, setHoldBackward] = useState(false)


  useEffect(() => {
    if (holdForward){
      writeToBleServer(connectedDevice, "Moving forward")
    } else if (holdBackward) {
      writeToBleServer(connectedDevice, "Moving backwards")
    } else {
      writeToBleServer(connectedDevice, "Stopped")
    }

  }, [holdForward, holdBackward])
  

 

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      await Location.watchHeadingAsync(data => {
        setCompass(data)
      })
      
      dispatch(setMyLocation(location))
      get_car_location()
    })();
  }, []);

  function getDirectionsToCar(){
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${carLocation[0]},${carLocation[1]}`;
    const label = 'Lyriq is here';
    const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
    });

    
    Linking.openURL(url);
  }

  function get_car_location(){
    const db = getDatabase();
    const carLocationRef = ref(db, 'car_location');
    onValue(carLocationRef, (snapshot) => {
        const data = snapshot.val();
        dispatch(setCarLocation(data.position))
      });
}

  const [ pin, setPin ] = useState({
		latitude: carLocation[0],
		longitude: carLocation[1]
	})
	const [ region, setRegion ] = useState({
		latitude: carLocation[0],
		longitude: carLocation[1],
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})


  function renderMyLocation(){
    if (myLocation.coords != undefined){
      return (
        <Marker  pinColor="black" title="You are here" coordinate={{ latitude: myLocation.coords.latitude, longitude: myLocation.coords.longitude }} >
          <Image  source={require('../../assets/nav_icon.png')} resizeMode="contain" style={{height: 80, width: 80, transform: [{rotate: `${compass.trueHeading}deg`}]}}></Image>
        </Marker>
      )
    }
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
		<View style={{ flex: 1 }}>
			
			<MapView
        mapType='Hybrid'
        customMapStyle={mapCustomStyle}
				style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height-300,
        }}
				initialRegion={{
					latitude: carLocation[0],
					longitude: carLocation[1],
					latitudeDelta: distance >= 0? distance  * diff_const : 0.01,
					longitudeDelta: distance >= 0? distance  * diff_const : 0.01
				}}
		
			>
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
        <Entypo name="chevron-left" size={24} color="white" />
      </Pressable>
      <View style={{height: 50, width: 250, top: 50, left: 80, backgroundColor: '#202120', borderRadius: 20, flexDirection: 'row'}}>
      <TouchableOpacity>
      <MaterialCommunityIcons
              style={{marginTop: 5, marginLeft: 5, top: 50, left: 80}}
              name="steering"
              size={38}
              color={'white'}
            />
        </TouchableOpacity>
        <Text style={{color: 'white', marginTop: 15, fontWeight: 'bold', fontSize: 18, top: 50, left: 80}}>{driveStatus.status[0]}-{speed}km/h-{distance}m</Text>
        
      </View>

				<Marker  title="Lyriq Parked Here" coordinate={{ latitude: region.latitude, longitude: region.longitude }} > 
          <Image source={require('../../assets/controls.png')} resizeMode="contain" style={{height: 150, width: 150}}></Image>
        </Marker>

        {renderMyLocation()}
			
				<Circle center={pin} radius={1000} />
   
			</MapView>
      
      
        <View style={{height: 300, backgroundColor: "#202120"}} >
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30, marginTop: 20, marginLeft: 15, fontFamily: 'Arial Hebrew'}}>Summon Mode</Text>
          
          <Text style={{color: 'white', fontWeight: 'bold', marginLeft: 20, marginTop: 10}}>{connectedDevice?.name != null ? (holdForward || holdBackward ? "Release To Stop" : "Press and hold controls to move vehicle") : "Must Connect to Vehicle via Bluetooth to Enable Summon Mode" }</Text>

          <TouchableOpacity onPress={getDirectionsToCar}>
          <View style={{borderColor: 'white', borderWidth: 2, height: "30%", width: "90%", marginTop: 25, marginLeft: '5%', backgroundColor:'#232423', borderRadius: 10, flexDirection:'row'}}>
          <MaterialCommunityIcons
                style={{marginTop: 5, marginLeft: 5, left: 40}}
                name="directions"
                size={25}
                color={'white'}
              />
            <Text style={{color: 'white', fontSize: 20, marginLeft: "18%", fontWeight: 'bold', marginTop: 5}}>Directions to vehicle</Text>
          </View>
          </TouchableOpacity>


          <Pressable onPressIn={() => setHoldForward(true)} onPressOut={() => setHoldForward(false)}>
          <View style={{borderColor: 'white', borderWidth: 2, height: 80, width: 170, marginTop: "-10%", marginLeft: '5%', backgroundColor: holdForward ? '#025bf5' : '#232423', borderRadius: 20}}>
          <MaterialCommunityIcons
                style={{marginTop: 5, marginLeft: 5, left: 40}}
                name="arrow-up-bold"
                size={80}
                color={holdForward ? 'white' : 'gray'}
              />
          </View>
          </Pressable>


        <Pressable onPressIn={() => setHoldBackward(true)} onPressOut={() => setHoldBackward(false)}>
        <View style={{borderColor: 'white', borderWidth: 2, height: 80, width: 170, marginTop: 25, marginLeft: '5%', marginRight: '5%', top: -103, left: 180, backgroundColor: holdBackward ? '#025bf5' : '#232423', borderRadius: 20}}>
        <MaterialCommunityIcons
              style={{marginTop: 5, marginLeft: 5, left: 40}}
              name="arrow-down-bold"
              size={80}
              color={holdBackward ? 'white':'gray'}
            />
        
        </View>
        </Pressable>
      </View>
     
		</View>
    
      
    </GestureHandlerRootView>
	)
  
}




const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
  bottomTab: {
    backgroundColor: 'black',
    height: "100%"
  },
	map: {
		width: Dimensions.get("window").width,
		height:  Dimensions.get("window").height-500
	},
  back: {
    position: 'absolute',
    top: 50,
    left: 25,
    backgroundColor: '#2f3030',
    padding: 10,
    borderRadius: 5,
  },
  infoText: {
    fontSize: 15,
    fontWeight: 'bold',
    textShadowColor: 'white',
    color: 'white'
  }
})