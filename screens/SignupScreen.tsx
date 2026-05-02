import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

interface SignupScreenProps {
  onNavigateToLogin: () => void;
}

export default function SignupScreen({ onNavigateToLogin }: SignupScreenProps) {
  // State for form inputs
  const [fullname, setFullname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Convex mutation for registration
  const registerUser = useMutation(api.users.register);

  const handleSignup = async () => {
    // Validation
    if (!fullname || !username || !password) {
      Alert.alert("Missing Fields", "Please fill in all requirements.");
      return;
    }

    try {
      const result = await registerUser({
        fullname,
        username,
        password,
      });

      // Handle the union return type from your register mutation
      if (typeof result === "object" && result?.success === false) {
        Alert.alert("Registration Failed", result.message);
      } else {
        Alert.alert("Success", "Account created successfully!");
        onNavigateToLogin();
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred during signup.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. Header Section */}
      <View style={styles.header}>
        <Image
          source={require("./../../assets/Signup.webp")}
          style={styles.image}
        />
      </View>

      {/* 2. Form Section */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="John Doe" 
          value={fullname}
          onChangeText={setFullname}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput 
          style={styles.input} 
          placeholder="johndoe123" 
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-google" size={30} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-apple" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-facebook" size={30} color="#4267B2" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text style={styles.linkText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7D7AFF",
    paddingTop: 40,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "70%",
    resizeMode: "contain",
  },
  formContainer: {
    flex: 3, // Increased flex to accommodate new field
    backgroundColor: "#FFF",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 30,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#FFCC00",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 30,
  },
  loginButtonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  orText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialIcon: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  linkText: {
    color: "#FFCC00",
    fontWeight: "bold",
  },
});