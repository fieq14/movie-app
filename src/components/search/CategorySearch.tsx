import React, { useState } from 'react';
import { View, Picker, Button, StyleSheet, Text } from 'react-native';

const CategorySearch = (): JSX.Element => {
  const [category, setCategory] = useState<string>('Category1');

  const handleSearch = () => {

    console.log('Searching in category:', category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category Search</Text>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Category 1" value="Category1" />
        <Picker.Item label="Category 2" value="Category2" />
        <Picker.Item label="Category 3" value="Category3" />
      </Picker>
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
});

export default CategorySearch;
