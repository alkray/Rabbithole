import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

const HomePage = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Add your logout logic here
    // For example, clear user data or navigate back to the login screen
    router.push('/'); // Redirect to login page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Rabbit Hole!</Text>
      <Text style={styles.instructionText}>We're glad to have you here.</Text>
      
      {/* Add more content or components here as needed */}

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa', // Light background color
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333', // Dark text color
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555', // Slightly lighter text color
  },
});

export default HomePage;
