import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback, StyleSheet, Text, View } from 'react-native';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Home from './screens/Home';
import Secondscreen from './screens/SecondScreen';
import { initializeApp } from 'firebase/app';
import { Video } from 'expo-av';


const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyA58eYFde53BL8XbXf2T8sx1S3PkksCbUk",
  authDomain: "delimaform.firebaseapp.com",
  projectId: "delimaform",
  storageBucket: "delimaform.appspot.com",
  messagingSenderId: "1081824813336",
  appId: "1:1081824813336:web:beccee9ba2c77de602fe6d",
  measurementId: "G-TCF0ES5ZKC"
};


export default function App() {
  const videoRef = useRef(null);

  const handleTap = () => {
    // Navigate to the login screen or any other screen on tap
    navigation.navigate('Login'); // Example navigation to Login screen
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BackgroundVideo" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BackgroundVideo" component={BackgroundVideoScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Secondscreen" component={Secondscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Custom component for the screen with background video
function BackgroundVideoScreen({ navigation }) {
  const videoRef = useRef(null);

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={require('./assets/Weather.mp4')}
          style={styles.video}
          resizeMode="cover"
          shouldPlay
          isLooping
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>Tap to Continue</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',  // White text
    textAlign: 'center',
  },
});