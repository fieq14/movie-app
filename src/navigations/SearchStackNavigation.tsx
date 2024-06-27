import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieDetail from '../screens/MovieDetail';
import Search from '../screens/Search';
import KeywordSearch from '../components/search/KeywordSearch';
import CategorySearch from '../components/search/CategorySearch';
import CategorySearchResult from '../components/search/CategorySearchResult';

const Stack = createNativeStackNavigator();

const SearchStackNavigation = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen
      name="SearchScreen"
      component={Search}
      options={{ headerShown: false, title: 'Search' }}
    />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetail}
      options={{ headerShown: true, title: 'Movie Detail' }}
    />
    <Stack.Screen
      name="KeywordSearch"
      component={KeywordSearch}
      options={{ headerShown: false, title: 'KeywordSearch' }}
    />
    <Stack.Screen
      name="CategorySearch"
      component={CategorySearch}
      options={{ headerShown: false, title: 'CategorySearch' }}
    />
    <Stack.Screen
      name="CategorySearchResult"
      component={CategorySearchResult}
      options={{ headerShown: true, title: 'Category Search Result' }}
    />
  </Stack.Navigator>
);

export default SearchStackNavigation;
