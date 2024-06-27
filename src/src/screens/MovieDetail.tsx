import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { API_ACCESS_TOKEN } from '@env';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, StackActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const MovieDetail = ({ route }: any): JSX.Element => {
  const navigation = useNavigation();
  const { id } = route.params;
  const [movie, setMovie] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    fetchMovieDetail();
    fetchRecommendations();
    checkIfFavorite();
  }, []);

  const fetchMovieDetail = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovie(response);
      })
      .catch((errorResponse) => {
        console.log(errorResponse);
      });
  };

  const fetchRecommendations = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setRecommendations(response.results);
      })
      .catch((errorResponse) => {
        console.log(errorResponse);
      });
  };

  const checkIfFavorite = async (): Promise<void> => {
    try {
      const favorites = await AsyncStorage.getItem('favoriteMovies');
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        setIsFavorite(parsedFavorites.some((movie: any) => movie.id === id));
      }
    } catch (error) {
      console.log('Error checking favorite:', error);
    }
  };

  const addFavorite = async (): Promise<void> => {
    try {
      const favorites = await AsyncStorage.getItem('favoriteMovies');
      let parsedFavorites = favorites ? JSON.parse(favorites) : [];
      if (!parsedFavorites.some((movie: any) => movie.id === id)) {
        parsedFavorites.push(movie);
        await AsyncStorage.setItem('favoriteMovies', JSON.stringify(parsedFavorites));
        setIsFavorite(true);
      }
    } catch (error) {
      console.log('Error adding favorite:', error);
    }
  };

  const removeFavorite = async (): Promise<void> => {
    try {
      const favorites = await AsyncStorage.getItem('favoriteMovies');
      let parsedFavorites = favorites ? JSON.parse(favorites) : [];
      parsedFavorites = parsedFavorites.filter((movie: any) => movie.id !== id);
      await AsyncStorage.setItem('favoriteMovies', JSON.stringify(parsedFavorites));
      setIsFavorite(false);
    } catch (error) {
      console.log('Error removing favorite:', error);
    }
  };

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
          style={styles.bannerImage}
        />
        <LinearGradient
          colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
          locations={[0.6, 0.8]}
          style={styles.gradientStyle}
        >
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="yellow" />
            <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
          </View>
          <TouchableOpacity onPress={isFavorite ? removeFavorite : addFavorite} style={styles.favoriteButton}>
            <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={24} color={isFavorite ? 'red' : 'white'} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.overview}>{movie.overview}</Text>
        <View style={styles.additionalInfoContainer}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Original Language:</Text>
            <Text style={styles.infoValue}>{movie.original_language}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Popularity:</Text>
            <Text style={styles.infoValue}>{movie.popularity}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Release Date:</Text>
            <Text style={styles.infoValue}>{new Date(movie.release_date).toDateString()}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Vote Count:</Text>
            <Text style={styles.infoValue}>{movie.vote_count}</Text>
          </View>
        </View>
        <Text style={styles.recommendationTitle}>Recommendation</Text>
        <FlatList
          horizontal
          data={recommendations}
          renderItem={({ item }) => {
            const pushAction = StackActions.push('MovieDetail', { id: item.id });
            return (
              <TouchableOpacity
                style={styles.recommendationItem}
                onPress={() => navigation.dispatch(pushAction)}
              >
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                  style={styles.recommendationImage}
                />
                <Text style={styles.recommendationText}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  gradientStyle: {
    padding: 8,
    height: '100%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: 'yellow',
    marginLeft: 4,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
  },
  overview: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 16,
  },
  additionalInfoContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoColumn: {
    width: '48%',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoValue: {
    fontWeight: 'normal',
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  recommendationItem: {
    marginRight: 8,
  },
  recommendationImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  recommendationText: {
    width: 100,
    textAlign: 'center',
    fontSize: 12,
    marginTop: 4,
  },
});

export default MovieDetail;
