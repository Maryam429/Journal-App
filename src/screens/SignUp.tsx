//Signup page for user to put their email and password
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp: React.FC<SignUpProps> = ({ navigation }) =>  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.navigate('Profile');
        })
        .catch(error => {
          Alert.alert('Signup Error', error.message);
        });
    } else {
      Alert.alert('Missing Info', 'Please enter both email and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24
},
  input: {
    width: '100%',
    borderWidth: 1,
    marginBottom: 16,
    padding: 12,
    borderRadius: 8
},
  button: {
    backgroundColor: '#003366',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center' 
},
  buttonText: {
    color: '#fff',
    fontWeight: '600',
}
});

export default SignUp;
