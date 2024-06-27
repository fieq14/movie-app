import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavoriteMovies();
    });

    return unsubscribe;
  }, [navigation]);

  const getFavoriteMovies = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favoriteMovies');
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        setFavoriteMovies(parsedFavorites);
      }
    } catch (error) {
      console.log('Error fetching favorites:', error);
    }
  };

  const handleMoviePress = (movieId: number) => {
    navigation.navigate('MovieDetail', { id: movieId });
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleMoviePress(item.id)} style={styles.movieItem}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} style={styles.moviePoster} />
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Movies</Text>
      <FlatList
        data={favoriteMovies}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  movieItem: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
  },
  moviePoster: {
    width: 150,
    height: 225,
    borderRadius: 8,
    marginBottom: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default Favorite;
