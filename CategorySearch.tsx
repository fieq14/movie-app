import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import type { Genre } from '../../types/app'
import { useNavigation, StackActions } from '@react-navigation/native'

const CategorySearch = ({ route }: any): JSX.Element => {
  const [genres, setGenres] = useState([])
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [genresName, setGenresName] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    fetchGenres()
  }, [])

  const fetchGenres = (): void => {
    const url = `https://api.themoviedb.org/3/genre/movie/list`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setGenres(response.genres)
      })
      .catch((error) => console.error('Error fetching genres:', error))
  }

  const pushAction = StackActions.push('CategoryResults', {
    genreId: selectedGenres,
    genreName: genresName,
  })
  const handleCategorySelect = (id, name) => {
    setSelectedGenres(id)
    setGenresName(name)
  }

  return (
    <View style={styles.container}>
        <FlatList
          data={genres}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                ...styles.buttonLabel,
                backgroundColor: item.id === selectedGenres ? '#8978A4' : '#dfd7ec',
                borderRadius: 20,
              }}
              onPress={() => handleCategorySelect(item.id, item.name)}
            >
              <Text style={styles.labelName}>{item.name}</Text>
            </TouchableOpacity>     
          )}
          columnWrapperStyle={styles.row}
          numColumns={2}

      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.dispatch(pushAction)}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  container: {
    paddingTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  buttonLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 36,
    marginBottom: 2,
  },
  labelName: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: '#8c77a7',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: '100%',
    marginTop: 10,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
})

export default CategorySearch