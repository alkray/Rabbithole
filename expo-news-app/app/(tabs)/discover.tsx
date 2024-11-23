import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Searchbar from '@/components/Searchbar'; // Import your custom Searchbar component
import { Colors } from '@/constants/Colors';
import CheckBox from '@/components/CheckBox';
import { useNewsCategories } from '../hooks/useNewsCategories'; // Ensure this hook is implemented
import { useNewsCountries } from '../hooks/UseNewsCountry'; // Ensure this hook is implemented
import { Link } from 'expo-router';

const Page = () => {
  const { top: safeTop } = useSafeAreaInsets();

  // Hooks for categories and countries
  const { newsCategories, toggleNewsCategory } = useNewsCategories();
  const { newsCountries, toggleNewsCountry } = useNewsCountries();

  // States for search query, category, and country
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');

  return (
    <View style={[styles.container, { paddingTop: safeTop + 20 }]}>
      {/* Searchbar Component */}
      <Searchbar withHorizontalPadding={false} setSearchQuery={setSearchQuery} />

      {/* Categories Section */}
      <Text style={styles.title}>Categories</Text>
      <View style={styles.listContainer}>
        {newsCategories.map((item) => (
          <CheckBox
            key={item.id}
            label={item.title}
            checked={item.selected}
            onPress={() => {
              toggleNewsCategory(item.id);
              setCategory(item.slug); // Set category based on slug
            }}
          />
        ))}
      </View>

      {/* Countries Section */}
      <Text style={styles.title}>Country</Text>
      <View style={styles.listContainer}>
        {newsCountries.map((item, index) => (
          <CheckBox
            key={index}
            label={item.name}
            checked={item.selected}
            onPress={() => {
              toggleNewsCountry(index);
              setCountry(item.code); // Set country code
            }}
          />
        ))}
      </View>

      {/* Search Button */}
      <Link
        href={{
          pathname: `/news/search`,
          params: { query: searchQuery, category, country },
        }}
        asChild
      >
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchBtnTxt}>Search</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  searchBtn: {
    backgroundColor: Colors.tint,
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
  },
  searchBtnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
