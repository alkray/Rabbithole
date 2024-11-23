import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NewsDataType } from '@/types'; // Use the common NewsDataType

type CategoriesProps = {
  trendingNews: NewsDataType[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const categories = ['All', 'Politics', 'Science', 'Entertainment'];

const Categories = ({
  trendingNews = [],
  selectedCategory,
  setSelectedCategory,
}: CategoriesProps) => {
  // Filter news based on the selected category
  const filteredNews = trendingNews.filter((news) =>
    selectedCategory === 'All'
      ? true
      : news.title.toLowerCase().includes(selectedCategory.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trending Right Now</Text>
      {/* Render category buttons */}
      <View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.activeCategoryButton,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Render filtered news */}
      <FlatList
        data={filteredNews}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Image
              source={
                item.urlToImage
                  ? { uri: item.urlToImage }
                  : require('@/assets/images/icon.png') // Placeholder image
              }
              style={styles.image}
            />
            <View style={styles.textWrapper}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.sourceName}>
                {item.source?.name || 'Unknown Source'}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 10,
  },
  activeCategoryButton: {
    backgroundColor: '#ff4d4d',
    borderColor: '#ff4d4d',
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  activeCategoryText: {
    color: '#fff',
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sourceName: {
    fontSize: 12,
    color: '#555',
  },
});
