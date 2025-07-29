
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const DealDetailScreen = ({ route }) => {
  const { dealId } = route.params;
  const [deal, setDeal] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchDealDetails = async () => {
      try {
        const response = await axios.get(`https://spicybeats.com/api/deals/${dealId}`);
        setDeal(response.data);
      } catch (err) {
        console.log('Error fetching deal details:', err);
      }
    };
    fetchDealDetails();
  }, [dealId]);

  const handleComment = async () => {
    try {
      await axios.post(`https://spicybeats.com/api/deals/${dealId}/comment`, { comment });
    } catch (err) {
      console.log('Error posting comment:', err);
    }
  };

  const handleVote = async (type) => {
    try {
      const response = await axios.post(`https://spicybeats.com/api/deals/${dealId}/vote`, { type });
      setDeal({ ...deal, vote_count: response.data.vote_count });
    } catch (err) {
      console.log('Error voting:', err);
    }
  };

  const handleFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem('favorites');
      const ids = stored ? JSON.parse(stored) : [];
      if (!ids.includes(dealId)) {
        ids.push(dealId);
        await AsyncStorage.setItem('favorites', JSON.stringify(ids));
      }
    } catch (err) {
      console.log('Error saving favorite:', err);
    }
  };

  const handleRate = async (value) => {
    try {
      await axios.post(`https://spicybeats.com/api/deals/${dealId}/rate`, { rating: value });
      setRating(value);
    } catch (err) {
      console.log('Error rating deal:', err);
    }
  };

  if (!deal) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text>{deal.title}</Text>
      <Text>{deal.description}</Text>
      <Text>Votes: {deal.vote_count}</Text>
      <Button title="Upvote" onPress={() => handleVote('up')} />
      <Button title="Downvote" onPress={() => handleVote('down')} />
      <Button title="Add to Favorites" onPress={handleFavorite} />
      <Text>Average Rating: {deal.avg_rating}</Text>
      <View style={styles.ratingRow}>
        {[1,2,3,4,5].map((r) => (
          <Button key={r} title={r.toString()} onPress={() => handleRate(r)} />
        ))}
      </View>
      <Text>Comments:</Text>
      {deal.comments.map((c, index) => (
        <Text key={index}>{c.user}: {c.text} - {c.timestamp}</Text>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Add a comment"
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Submit Comment" onPress={handleComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 },
  ratingRow: { flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between' },
});

export default DealDetailScreen;
