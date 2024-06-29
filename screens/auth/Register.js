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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

// Import your show/hide password icon here (example using MaterialIcons)
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Register({ navigation }) {
  const { isDarkmode } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle show/hide password

  const handleRegister = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      console.log("User registered:", userCredential.user.uid);
      navigation.navigate('Home');
    } catch (error) {
      setLoading(false);
      console.error("Error registering user:", error.message);
      Alert.alert("Registration Error", error.message);
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
              source={require("../../assets/regis.png")}
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
              size="h3"
              style={{
                alignSelf: "center",
                paddingVertical: 20,
              }}
            >
              Register
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
              text={loading ? "Loading" : "Create an account"}
              onPress={handleRegister}
              style={{ marginTop: 20 }}
              disabled={loading}
            />
            <TouchableOpacity
              style={{ alignItems: "center", marginTop: 20 }}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={{ color: "black" }}>
                Already have an account?{" "}
              </Text>
              <Text style={{ color: "blue", fontWeight: "bold" }}>
                Login here
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
