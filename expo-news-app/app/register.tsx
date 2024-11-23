import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter(); // To navigate to login page

  const handleRegister = async () => {
    if (!username || !email || !password || !firstName || !lastName || !phoneNumber) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }
  
    try {
      const response = await fetch('http://10.250.46.156:5000/api/register', { // Replace <YOUR_BACKEND_IP>:<PORT> with the actual backend URL and port, e.g., http://192.168.1.5:5000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email, phone_number: phoneNumber, username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Registration successful, redirect to login page
        Alert.alert('Success', 'Registration successful! Please log in.');
        router.push('/'); // Navigate back to login page
      } else {
        // Show error message from server
        Alert.alert('Error', data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      Alert.alert('Error', 'An error occurred during registration.');
    }
  };
  

  const handleLoginRedirect = () => {
    router.push('/'); // Navigate back to login page (assuming your login page is at '/')
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ImageBackground
        source={require('@/assets/images/getting-started.jpg')}
        style={styles.background}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <BlurView intensity={50} tint="light" style={styles.blurContainer}>
            <View style={styles.innerContainer}>
              <Text style={styles.welcomeText}>Create an Account</Text>

              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                returnKeyType="done"
                placeholderTextColor="#999"
                onSubmitEditing={Keyboard.dismiss}
              />

              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                returnKeyType="done"
                placeholderTextColor="#999"
                onSubmitEditing={Keyboard.dismiss}
              />

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                returnKeyType="done"
                placeholderTextColor="#999"
                onSubmitEditing={Keyboard.dismiss}
              />

              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                returnKeyType="done"
                placeholderTextColor="#999"
                onSubmitEditing={Keyboard.dismiss}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                returnKeyType="done"
                placeholderTextColor="#999"
                onSubmitEditing={Keyboard.dismiss}
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="done"
                placeholderTextColor="#999"
                onSubmitEditing={Keyboard.dismiss}
              />

              <TouchableOpacity onPress={handleRegister} style={styles.signUpButtonCustom}>
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>

              <View style={styles.loginRedirectContainer}>
                <Text style={styles.loginRedirectText}>Already have an account?</Text>
                <TouchableOpacity onPress={handleLoginRedirect}>
                  <Text style={styles.loginRedirectButton}>Sign in here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </ScrollView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  blurContainer: {
    marginTop: 100,
    margin: 20,
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
  },
  innerContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  signUpButtonCustom: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000', // Black border
    borderWidth: 2,      // Border width
    borderRadius: 8,     // Border radius
    marginTop: 20,
  },
  signUpButtonText: {
    fontSize: 18,
    color: '#000',       // Text color
    fontWeight: 'bold',
  },
  loginRedirectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginRedirectText: {
    fontSize: 16,
    marginRight: 5,
    color: '#000',
  },
  loginRedirectButton: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
});
