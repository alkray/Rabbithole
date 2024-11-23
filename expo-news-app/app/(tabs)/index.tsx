import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import Searchbar from '@/components/Searchbar';
import BreakingNews from '@/components/BreakingNews';
import Categories from '@/components/Categories';
import NewsList from '@/components/NewsList';
import Loading from '@/components/Loading';
import { NewsDataType } from '@/types';



const Page = () => {
  const { top: safeTop } = useSafeAreaInsets();

  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [trendingNews, setTrendingNews] = useState<NewsDataType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    await Promise.all([getBreakingNews(), getTrendingNews(), getNews()]);
    setLoading(false);
  };

  const API_KEY = '';

  const getBreakingNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&image=1&country=us&language=en&pageSize=5`
      );
      const updatedArticles = mapArticlesWithIds(response.data.articles);
      setBreakingNews(updatedArticles);
    } catch (error) {
      console.error('Error fetching breaking news:', error);
    }
  };

  const getTrendingNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?apiKey=${API_KEY}&q=trending&image=1&language=en&pageSize=10`
      );
      const updatedArticles = mapArticlesWithIds(response.data.articles);
      setTrendingNews(updatedArticles);
    } catch (error) {
      console.error('Error fetching trending news:', error);
    }
  };

  const getNews = async (category: string = '') => {
    try {
      let url = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&q=general&image=1&language=en&pageSize=20`;
      if (category && category !== 'All') {
        url = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&category=${category.toLowerCase()}&country=us&language=en&pageSize=20&image=1`;
      }
      const response = await axios.get(url);
      const updatedArticles = mapArticlesWithIds(response.data.articles);
      setNews(updatedArticles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const mapArticlesWithIds = (articles: any[]) => {
    return articles.map((article, index) => ({
      ...article,
      article_id: article.url || `fallback-${index}`, // Add unique fallback IDs
    }));
  };

  const onCatChanged = (category: string) => {
    console.log('Category selected:', category);
    setSelectedCategory(category); // Update selected category
    setLoading(true); // Show loading spinner
    getNews(category).finally(() => setLoading(false)); // Fetch news for the selected category
  };

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <FlatList
        data={news} // Main list to manage scrolling
        keyExtractor={(item, index) => {
          const key = item.article_id || `fallback-${index}`;
          console.log(`Generated key: ${key}`);
          return key;
        }}
        ListHeaderComponent={
          <>
            <Header />
            <Searchbar withHorizontalPadding={true} setSearchQuery={function (query: string): void {
              throw new Error('Function not implemented.');
            } } />
            <BreakingNews newsList={breakingNews} />
            <Categories
              trendingNews={trendingNews}
              selectedCategory={selectedCategory}
              setSelectedCategory={onCatChanged}
            />
          </>
        }
        renderItem={({ item }) => (
          <NewsList newsList={[item]} /> // Render each news item
        )}
        ListFooterComponent={
          loading ? <Loading size="large" /> : null // Display loading at the end
        }
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
