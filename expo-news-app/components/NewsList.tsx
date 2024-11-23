import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

type NewsDataType = {
  article_id: string;
  urlToImage: string | null;
  category: string;
  title: string;
  source_name: string;
};

type Props = {
  newsList: Array<NewsDataType>;
};

const NewsList = ({ newsList }: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={newsList}
        keyExtractor={(item, index) => item.article_id || `fallback-${index}`}
        renderItem={({ item }) => (
          <Link href={`/news/${encodeURIComponent(item.article_id)}`} asChild>
            <TouchableOpacity>
              <NewsItem item={item}/>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
};

export default NewsList;

export const NewsItem = ({item}: {item: NewsDataType}) =>{
  return(
    <View style={styles.itemContainer}>
                <Image
                  source={{
                    uri: item.urlToImage && item.urlToImage.startsWith('http')
                      ? item.urlToImage
                      : 'https://via.icon.com/150', // Fallback placeholder image
                  }}
                  style={styles.itemImg}
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemCategory}>{item.category || 'General'}</Text>
                  <Text style={styles.itemTitle}>{item.title || '[No Title Available]'}</Text>
                  <Text style={styles.itemSourceName}>{item.source_name || 'Unknown Source'}</Text>
                </View>
              </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemImg: {
    width: 90,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: 'cover',
    backgroundColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
  },
  itemCategory: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  itemSourceName: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
});
