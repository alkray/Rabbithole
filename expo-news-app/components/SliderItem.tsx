import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';

type NewsDataType = {
  article_id: string; // Unique ID for the article
  title: string;
  description: string;
  urlToImage: string;
  source: { name: string };
};

type Props = {
  slideItem: NewsDataType; // Single slide data
  index: number; // Index of the slide in the carousel
};

const SliderItem = ({ slideItem }: Props) => {
  // Validate the article_id to prevent issues
  if (!slideItem.article_id) {
    console.error(`Invalid article_id for slideItem:`, slideItem);
    return null; // Do not render if article_id is missing
  }

  return (
    <Link
      href={`/news/${encodeURIComponent(slideItem.article_id)}`}
      asChild
    >
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          if (!slideItem.article_id) {
            Alert.alert('Error', 'Article ID is missing.');
          }
        }}
      >
        <Image
          source={{
            uri: slideItem.urlToImage?.startsWith('http')
              ? slideItem.urlToImage
              : 'https://via.icon.com/400', // Fallback image
          }}
          style={styles.image}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.sourceName}>
            {slideItem.source?.name || 'Unknown Source'}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            {slideItem.title || 'Untitled Article'}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  container: {
    width: 300,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  textWrapper: {
    padding: 10,
  },
  sourceName: {
    fontSize: 12,
    color: Colors.darkGrey,
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
});
