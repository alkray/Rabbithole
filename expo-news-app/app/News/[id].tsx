import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import Loading from '@/components/Loading';

type ArticleType = {
  title: string;
  content: string;
  description: string;
  urlToImage: string;
  source: { name: string };
  publishedAt: string;
};

const API_KEY = '6a72c16b07774a419b36bf8ba7602870';

const ArticleDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchArticle(id);
    }
  }, [id]);

  const fetchArticle = async (articleId: string) => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?apiKey=${API_KEY}&q=${encodeURIComponent(articleId)}`
      );
      // Assuming the first result matches the `id`
      setArticle(response?.data?.articles[0] || null);
    } catch (error) {
      console.error('Error fetching article details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading size="large" />;
  }

  if (!article) {
    return <Text style={styles.errorText}>Article not found.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
          title: article.title || 'Article Details',
        }}
      />
      {article.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.articleImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>Image Not Available</Text>
        </View>
      )}
      <Text style={styles.articleTitle}>{article.title}</Text>
      <Text style={styles.articleSource}>Source: {article.source?.name || 'Unknown'}</Text>
      <Text style={styles.articlePublishedAt}>
        Published At: {new Date(article.publishedAt).toLocaleString() || 'N/A'}
      </Text>
      <Text style={styles.articleContent}>
        {article.content || article.description || '[No content available]'}
      </Text>
    </ScrollView>
  );
};

export default ArticleDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholderText: {
    color: '#888',
    fontSize: 14,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  articleSource: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  articlePublishedAt: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  articleContent: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
