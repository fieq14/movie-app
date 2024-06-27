import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  CategorySearch: undefined;
  CategorySearchResult: { genreId: string, genreName: string };
  MovieDetail: { id: number };
};

export type CategorySearchNavigationProp = StackNavigationProp<RootStackParamList, 'CategorySearch'>;
