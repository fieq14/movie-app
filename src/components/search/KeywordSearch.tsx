import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const KeywordSearch = (): JSX.Element => {
  const [keyword, setKeyword] = useState<string>('');
  const [movies, setMovies] = useState<any[]>([]);
  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=6838a65946127c6d07c8c7bbe4d89669&query=${keyword}`);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderMovieItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MovieDetail', { id: item.id, title: item.title });
        }}
        style={styles.movieItem}
      >
        <ImageBackground
          resizeMode="cover"
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
        >
          <LinearGradient
            colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
            locations={[0.6, 0.8]}
            style={styles.gradientStyle}
          >
            <Text style={styles.movieTitle}>{item.title}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="yellow" />
              <Text style={styles.rating}>{item.vote_average.toFixed(1)}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Keyword Search</Text>
      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Enter keyword"
        onSubmitEditing={handleSearch}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieItem}
        numColumns={3}
        contentContainerStyle={styles.movieList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  movieList: {
    paddingBottom: 20,
  },
  movieItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  backgroundImage: {
    marginRight: 4,
    width: 100,
    height: 150,
  },
  backgroundImageStyle: {
    borderRadius: 8,
  },
  movieTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  gradientStyle: {
    padding: 8,
    height: '100%',
    width: '100%',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    color: 'yellow',
    fontWeight: '700',
    marginLeft: 5,
  },
});

export default KeywordSearch;
