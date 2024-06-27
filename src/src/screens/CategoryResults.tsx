import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import MovieItem from '../components/movies/MovieItem'
import type { Movie } from '../types/app'

const CategoryResult = ({ route }: any): JSX.Element => {
    const {genreId, genreName} = route.params
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true)
            const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
                },
            }

            try {
                const response = await fetch(url, options)
                const data = await response.json()
                setMovies(data.results.filter((movie: Movie) => movie.vote_average !== 0))
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchMovies()
    }, [genreId])

    const renderItem = ({ item }: { item: any }) => (
      <View>
        <MovieItem
          movie={item}
          size={{
            width: 100,
            height: 160,
          }}
          coverType="poster"
          key={item.title}
        />
      </View>
    )

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.purpleLabel}></View>
                <Text style={styles.titleCategory}>Result of {genreName} Genre</Text>
            </View>
            {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#000" />
                  <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                
                <FlatList
                    data={movies}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    columnWrapperStyle={styles.row}
                    numColumns={3}
                    contentContainerStyle={styles.movieList}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        flex: 1,
        
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 12,
    },
    titleCategory: {
      fontSize: 20,
      fontWeight: '900',
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
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      justifyContent: 'space-around',
      marginBottom: 18,
    },
    purpleLabel: {
      width: 20,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#8978A4',
      marginRight: 12,
    },
})

export default CategoryResult