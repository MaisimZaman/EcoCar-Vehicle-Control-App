import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    connectedDevice: null,
    carLocation: [43.473071781737666, -80.54019785684477],
    myLocation: [null, null],
    driveStatus: "Parked",
    powerOn: false,
    vent: false,
    batteryRange: 0,
    interiorTemp: 22
}


export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setConnectedDevice: (state, action) => {
            state.connectedDevice = action.payload;
        },
        setCarLocation: (state, action) => {
            state.carLocation = action.payload;
        },
        setMyLocation: (state, action) => {
            state.myLocation = action.payload;
        },
        setDriveStatus: (state, action) => {
            state.driveStatus = action.payload;
        },
        setPoweredOn: (state, action) => {
            state.powerOn = action.payload;
        },
        setVent: (state, action) => {
            state.vent = action.payload;
        },
        setBatteryRange: (state, action) => {
            state.batteryRange = action.payload;
        },
        setInteriorTemp: (state, action) => {
            state.interiorTemp = action.payload;
        },
        
       
    },

});

export const {
    setConnectedDevice,
    setCarLocation,
    setMyLocation,
    setDriveStatus,
    setPoweredOn,
    setVent,
    setBatteryRange,
    setInteriorTemp

} = navSlice.actions;



export const selectConnectedDevice = (state) => state.nav.connectedDevice

export const selectCarLocation = (state) => state.nav.carLocation

export const selectMyLocation = (state) => state.nav.myLocation

export const selectDriveStatus = (state) => state.nav.driveStatus

export const selectPoweredOn = (state) => state.nav.powerOn

export const selectVent = (state) => state.nav.vent

export const selectBatteryRange = (state) => state.nav.batteryRange

export const selectInteriorTemp = (state) => state.nav.interiorTemp

const navReducer = navSlice.reducer

export default navReducer;
