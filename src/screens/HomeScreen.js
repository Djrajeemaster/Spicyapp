
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get('https://spicybeats.com/api/deals');
        setDeals(response.data);
      } catch (err) {
        console.log('Error fetching deals:', err);
      }
    };
    fetchDeals();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={deals}
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

export default HomeScreen;
