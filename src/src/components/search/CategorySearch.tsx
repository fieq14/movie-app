import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_ACCESS_TOKEN } from '@env';
import type { Movie } from '../../types/app';
import { CategorySearchNavigationProp } from '../../types/navigation';

const CategorySearch = (): JSX.Element => {
    const [genres, setGenres] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const navigation = useNavigation<CategorySearchNavigationProp>();

    useEffect(() => {
        const fetchGenres = async () => {
            setLoading(true);
            const url = `https://api.themoviedb.org/3/genre/movie/list?language=en-US`;
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
                setGenres(data.genres);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    const handleGenreSelect = (genreId: string, genreName: string) => {
        setSelectedGenre(genreId);
        navigation.navigate('CategorySearchResult', { genreId, genreName });
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <FlatList
                    data={genres}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.genreItem,
                                { backgroundColor: item.id.toString() === selectedGenre ? '#8978A4' : '#C0B4D5' }, 
                            ]}
                            onPress={() => handleGenreSelect(item.id.toString(), item.name)}
                        >
                            <Text style={styles.genreText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.genreList}
                    numColumns={2}
                />
            )}
        </View>
    );
};

const { width } = Dimensions.get('window');
const itemWidth = (width - 32 - 16) / 2; // width - padding * 2 - margin * 2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        paddingHorizontal: 0,
    },
    genreList: {
        paddingTop: 16,
    },
    genreItem: {
        width: itemWidth,
        margin: 3,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    genreText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default CategorySearch;