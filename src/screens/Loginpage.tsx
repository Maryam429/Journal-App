//login page
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { FontAwesome } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from "firebase/auth";
//define loginpage
type LoginPageProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
//using useState to store user email and password
//login function
  //checks if password or email are empty, shows alert
//then uses firebase authentication to check for correct user input, navigates to profile if true
//if login typed incorrectly, show alert
const LoginPage: React.FC<LoginPageProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.navigate('Profile');
        })
        .catch((error) => {
          Alert.alert("Login Failed", error.message);
        });
    } else {
      Alert.alert("Missing Info", "Please fill in both email and password.");
    }
  };
 
  
//render screen
//displays signup option with button if user wants to sign up
  return (
    <View style={styles.container}>
      


      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.signup}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ADD8E6', //light blue backgrounf
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#003366',
    //font'Snell Roundhand',
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#0077B6',
    borderWidth: 1.2,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#003366',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  signup: {
    flexDirection: 'row',
    marginTop: 30,
  },
  signupText: {
    fontSize: 14,
    color: '#333',
  },
  signupLink: {
    fontSize: 14,
    color: '#0077B6',
    fontWeight: '500',
  },
});

export default LoginPage;
