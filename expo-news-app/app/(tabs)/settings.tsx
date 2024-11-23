import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Switch, GestureHandlerRootView } from 'react-native-gesture-handler';

type Props = {};

const Page = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Settings',
          headerStyle: { backgroundColor: Colors.tint },
          headerTitleStyle: { color: Colors.white },
        }}
      />
      <View style={styles.container}>
        <Text style={styles.heading}>Settings</Text>
        <View style={styles.listContainer}>
          <TouchableOpacity style={styles.itemBtn}>
            <Text style={styles.itemBtnTxt}>About</Text>
            <MaterialIcons name="arrow-forward-ios" size={16} color={Colors.lightGrey} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemBtn}>
            <Text style={styles.itemBtnTxt}>Send Feedback</Text>
            <MaterialIcons name="arrow-forward-ios" size={16} color={Colors.lightGrey} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemBtn}>
            <Text style={styles.itemBtnTxt}>Privacy Policy</Text>
            <MaterialIcons name="arrow-forward-ios" size={16} color={Colors.lightGrey} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemBtn}>
            <Text style={styles.itemBtnTxt}>Terms of Use</Text>
            <MaterialIcons name="arrow-forward-ios" size={16} color={Colors.lightGrey} />
          </TouchableOpacity>
          <View style={[styles.itemBtn, styles.darkModeContainer]}>
            <Text style={styles.itemBtnTxt}>Dark Mode</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#3e3e3e' }}
              thumbColor={isEnabled ? Colors.tint : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <TouchableOpacity style={[styles.itemBtn, styles.logoutBtn]}>
            <Text style={[styles.itemBtnTxt, { color: 'red' }]}>Logout</Text>
            <MaterialIcons name="logout" size={16} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginVertical: 20,
    textAlign: 'center',
  },
  listContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  itemBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  darkModeContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemBtnTxt: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
  logoutBtn: {
    borderTopWidth: 1,
    borderTopColor: Colors.lightGrey,
    marginTop: 10,
  },
});
