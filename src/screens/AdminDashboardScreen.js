import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const AdminDashboardScreen = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('https://spicybeats.com/api/admin/stats');
        setStats(response.data);
      } catch (err) {
        console.log('Error fetching admin stats:', err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text>Total Deals: {stats.total}</Text>
      <Text>Approved Deals: {stats.approved}</Text>
      <Text>Pending Deals: {stats.pending}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
});

export default AdminDashboardScreen;
