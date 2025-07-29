
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [deals, setDeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDeals, setFilteredDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get('https://spicybeats.com/api/deals');
        setDeals(response.data);
        setFilteredDeals(response.data);
      } catch (err) {
        console.log('Error fetching deals:', err);
      }
    };
    fetchDeals();
  }, []);

  useEffect(() => {
    const filtered = deals.filter((d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDeals(filtered);
  }, [searchQuery, deals]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search deals"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredDeals}
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
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 },
  dealCard: { borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 10 },
});

export default HomeScreen;
