import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('favorites');
      const ids = stored ? JSON.parse(stored) : [];
      const deals = [];
      for (const id of ids) {
        const res = await axios.get(`https://spicybeats.com/api/deals/${id}`);
        deals.push(res.data);
      }
      setFavorites(deals);
    } catch (err) {
      console.log('Error loading favorites:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DealDetails', { dealId: item.id })}>
            <View style={styles.dealCard}>
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  dealCard: { borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 10 },
});

export default FavoritesScreen;
