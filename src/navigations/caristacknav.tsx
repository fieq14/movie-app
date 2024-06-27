import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../screens/MovieDetail';
import KeywordSearch from '../components/search/KeywordSearch'

const Stack = createNativeStackNavigator();

const caristacknav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={KeywordSearch} />
        <Stack.Screen name="MovieDetail" component={MovieDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default caristacknav