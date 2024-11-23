import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, Animated, Dimensions } from 'react-native';
import axios from 'axios';
import SliderItem from './SliderItem';
import { NewsDataType } from '@/types';

const { width } = Dimensions.get('screen');

const BreakingNews = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [newsList, setNewsList] = useState<NewsDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchBreakingNews();
  }, []);

  const fetchBreakingNews = async () => {
    const API_KEY = ''; // hidden api key 
    const URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=us&language=en&pageSize=5&image=1`;

    try {
      const response = await axios.get(URL);

      if (response?.data?.articles) {
        const updatedArticles = response.data.articles.map((article: any, index: number) => ({
          ...article,
          article_id: article.url ? encodeURIComponent(article.url) : `fallback-${index}`, // Encode and fallback
          urlToImage:
            article.urlToImage && article.urlToImage.startsWith('http')
              ? article.urlToImage
              : 'https://via.icon.com/400', // Fallback image
        }));
        setNewsList(updatedArticles);
      } else {
        setNewsList([]);
      }
    } catch (error) {
      console.error('Error fetching breaking news:', error);
      setNewsList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.placeholder}>
          <Animated.Text style={styles.placeholderText}>Loading...</Animated.Text>
        </View>
      ) : newsList.length > 0 ? (
        <FlatList
          data={newsList}
          keyExtractor={(item, index) => item.article_id || `fallback-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item }) => <SliderItem slideItem={item} />}
        />
      ) : (
        <View style={styles.placeholder}>
          <Animated.Text style={styles.placeholderText}>No news available</Animated.Text>
        </View>
      )}
      <View style={styles.pagination}>
        {newsList.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`pagination-dot-${i}`}
              style={[styles.dot, { width: dotWidth, opacity }]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    height: 250,
    marginVertical: 20,
  },
  placeholder: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginHorizontal: 4,
  },
});
