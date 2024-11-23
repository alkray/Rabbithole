import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import { NewsDataType } from '@/types';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import Loading from '@/components/Loading';
import { NewsItem } from '@/components/NewsList';

type Props = {};

const Page = (props: Props) => {
  const { query, category, country } = useLocalSearchParams<{
    query: string;
    category: string;
    country: string;
  }>();

  const [news, setNews] = useState<NewsDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      let queryString = query ? `&q=${query}` : "";
      let categoryString = category ? `&category=${category}` : "";
      let countryString = country ? `&country=${country}` : "";

      const API_KEY = "6a72c16b07774a419b36bf8ba7602870"; // Updated API key
      const url = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}${queryString}${categoryString}${countryString}&language=en&pageSize=20&image=1`;

      const response = await axios.get(url);
      const updatedArticles = response.data.articles.map((article: any, index: number) => ({
        ...article,
        article_id: article.url || `fallback-${index}`, // Add unique fallback IDs
      }));
      setNews(updatedArticles || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          title: "Search",
        }}
      />
      <View style={styles.container}>
        {loading ? (
          <Loading size="large" />
        ) : news.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No articles found.
          </Text>
        ) : (
          <FlatList
            data={news}
            keyExtractor={(item, index) => item.article_id || `fallback-${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Link href={`/news/${encodeURIComponent(item.article_id)}`} asChild>
                <TouchableOpacity>
                  <NewsItem item={item} />
                </TouchableOpacity>
              </Link>
            )}
          />
        )}
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
