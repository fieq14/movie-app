import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { API_ACCESS_TOKEN } from '@env';
import MovieItem from '../movie/MovieItem';
import type { Movie } from '../../types/app';

const CategorySearchResult = ({ route }: any): JSX.Element => {
    const {genreId, genreName} = route.params;
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
                },
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json();
                setMovies(data.results.filter((movie: Movie) => movie.vote_average !== 0));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [genreId]);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Result of {genreName} Genre</Text>
            {loading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                
                <FlatList
                    data={movies}
                    renderItem={({ item }) => (
                        <MovieItem movie={item} size={{ width: 100, height: 160 }} coverType="poster" />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    contentContainerStyle={styles.movieList}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 16,
        width: '100%',
        
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        // marginBottom: 16,
        textAlign: 'center',
    },
    movieList: {
        paddingTop: 16,
        width: '100%',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default CategorySearchResult;