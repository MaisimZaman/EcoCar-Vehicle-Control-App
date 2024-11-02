
Link to Setup Instructions: https://docs.google.com/document/d/1iq3r-L0XaBSkBhJypgOLn5JlqzqHoRDQCy04G-1d6HQ/edit?usp=sharing

How to setup UWAFT-App for Testing

Install Node into your computer at: https://nodejs.org/en/download
Git clone the repository of the directory of your choice
Run npm install  in root directory
Install the Expo Go: https://apps.apple.com/us/app/expo-go/id982107779  App on your android or Iphone device
Sign up to Expo at: https://expo.dev/signup
Run eas login in root directory and login with expo credentials
Building a Custom Development Client:
For Android Run: eas build --profile development --platform android
For IOS Run: eas build --profile development --platform android
Follow the rest of the steps outlined the terminal
For more Information: https://docs.expo.dev/develop/development-builds/create-a-build/
Once the custom development client is installed on the phone run: 
npx expo start --dev-client in root directory
IOS: Open up the camera app and scan the QR code displayed on the terminal and it will prompt to open the custom development build app, wait for the build to load and complete.
Android: Open up the custom development app build, click on “Scan QR Code” and scan the QR code on the terminal

Note: If running this on public wifi like Waterloo’s wifi, please turn on your phone’s hotspot and connect whichever computer the server is running on to your phone’s hotspot

How to set up the Bluetooth Low Energy Server. 

Note: The BLE server can be ran on the same computer as the Expo/React-Native app server for test purposes on a new terminal or on a completely different computer as long as it’s in bluetooth range

Move into the Directory cd NavQClient
Install Python BLE server Build requirements: 
pip install -r requirements
Start Python BLE server with: python BLEServer.py
