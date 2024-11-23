// Searchbar.tsx
import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const Searchbar = ({ withHorizontalPadding = false, setSearchQuery }) => {
  return (
    <View style={[styles.container, withHorizontalPadding && styles.withHorizontalPadding]}>
      <View style={styles.searchbar}>
        <Ionicons name="search-outline" size={20} color={Colors.black} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.black}
          style={styles.searchTxt}
          autoCapitalize="none"
          onChangeText={(text) => setSearchQuery(text)} // Update query
        />
      </View>
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  withHorizontalPadding: {
    paddingHorizontal: 20,
  },
  searchbar: {
    backgroundColor: '#037ffc',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
  },
  searchTxt: {
    fontSize: 14,
    flex: 1,
    color: Colors.black,
  },
});
