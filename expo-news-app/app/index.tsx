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

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }
    
    // Assuming the login is successful, redirect to homepage
    console.log('Username:', username, 'Password:', password);
    router.push("/(tabs)"); // Redirecting to homepage.jsx
  };

  const handleSignUp = () => {
    console.log('Sign Up button clicked');
    router.push('/register'); // Correct path for the registration screen
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
              <Text style={styles.welcomeText}>Welcome to Rabbit Hole</Text>

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
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="done"
                placeholderTextColor="#999"
                onSubmitEditing={Keyboard.dismiss}
              />

              <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account?</Text>
                <TouchableOpacity onPress={handleSignUp}>
                  <Text style={styles.signUpButton}>Sign Up</Text>
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
    marginTop: 150,
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
  loginButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  signUpText: {
    fontSize: 16,
    marginRight: 5,
    color: '#000',
  },
  signUpButton: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
});