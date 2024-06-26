import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const KeywordSearch = (): JSX.Element => {
  const [keyword, setKeyword] = useState<string>('');

  const handleSearch = () => {

    console.log('Searching for keyword:', keyword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Keyword Search</Text>
      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Enter keyword"
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default KeywordSearch;
