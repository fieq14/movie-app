import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { API_ACCESS_TOKEN } from '@env';
import MovieItem from '../movies/MovieItem';
import type { Movie } from '../../types/app';

const KeywordSearch = (): JSX.Element => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            return;
        }
        setLoading(true);
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=1`;
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

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Input title movie here"
                onChangeText={setSearchQuery}
                value={searchQuery}
                onSubmitEditing={handleSearch}
                lightTheme
                round
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInput}
            />
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
        paddingHorizontal:0
    },
    searchBarContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    searchBarInput: {
        backgroundColor: '#e1e1e1',
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

export default KeywordSearch;