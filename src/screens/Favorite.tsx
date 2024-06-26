import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorite = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = getFavoriteMovies();
        return () => unsubscribe();
    }, []);

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

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.movieItem}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} style={styles.moviePoster} />
            <Text>{item.title}</Text>
        </View>
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
