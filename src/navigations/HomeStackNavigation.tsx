import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import MovieDetail from '../screens/MovieDetail';
import Favorite from '../screens/Favorite';
import CategorySearch from '../components/search/CategorySearch';


const Stack = createNativeStackNavigator();

const HomeStackNavigation = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="MovieDetail" component={MovieDetail} />
    <Stack.Screen name="Favorite" component={Favorite} />
    <Stack.Screen name="CategorySearch" component={CategorySearch} />
  </Stack.Navigator>
);

export default HomeStackNavigation;