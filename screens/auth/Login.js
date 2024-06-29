import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  Alert,
} from "react-native";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

// Import your show/hide password icon here (example using MaterialIcons)
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Login({ navigation }) {
  const { isDarkmode } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle show/hide password

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigation.navigate('Home');
    } catch (error) {
      setLoading(false);
      console.error("Error logging in:", error.message);
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
              paddingVertical: 40,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 200,
                width: 200,
              }}
              source={require("../../assets/weather-forecast.png")}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
                paddingVertical: 20,
              }}
              size="h3"
            >
              Login
            </Text>
            <TextInput
              containerStyle={{ marginBottom: 15 }}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              autoCompleteType="email"
              keyboardType="email-address"
              autoCorrect={false}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                containerStyle={{ flex: 1, marginBottom: 15 }}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
                autoCapitalize="none"
                autoCompleteType="password"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)} // Toggle show/hide password
                style={{ padding: 10 }}
              >
                <Icon
                  name={showPassword ? "visibility-off" : "visibility"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <Button
              text={loading ? "Loading" : "Login"}
              onPress={handleLogin}
              style={{ marginTop: 20 }}
              disabled={loading}
            />
            <TouchableOpacity
              style={{ alignItems: "center", marginTop: 20 }}
              onPress={() => navigation.navigate("ForgetPassword")}
            >
              <Text style={{ color: "red", fontWeight: "bold" }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Text>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={{ color: "blue", fontWeight: "bold" }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
