import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_ACCESS_TOKEN } from '@env';

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const CategorySearch = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  useEffect(() => {
    if (selectedGenre) {
      fetchMoviesByGenre(selectedGenre);
    }
  }, [selectedGenre]);

  const fetchMoviesByGenre = (genreId: number): void => {
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`;
    const options = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovies(response.results);
      })
      .catch((errorResponse) => {
        console.log(errorResponse);
      });
  };

  const renderGenreItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.genreItem}
      onPress={() => setSelectedGenre(item.id)}
    >
      <Text style={styles.genreText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderMovieItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('MovieDetail', { id: item.id })}
    >
      <Text style={styles.movieTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={genres}
        renderItem={renderGenreItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.genreList}
      />
      {selectedGenre && (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.movieList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  genreList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  genreItem: {
    margin: 8,
    padding: 16,
    backgroundColor: '#D1C4E9',
    borderRadius: 8,
  },
  genreText: {
    fontSize: 16,
  },
  movieList: {
    marginTop: 16,
  },
  movieItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  movieTitle: {
    fontSize: 18,
  },
});

export default CategorySearch
