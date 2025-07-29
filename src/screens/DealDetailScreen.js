
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

const DealDetailScreen = ({ route }) => {
  const { dealId } = route.params;
  const [deal, setDeal] = useState(null);
  const [comment, setComment] = useState('');

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

  if (!deal) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text>{deal.title}</Text>
      <Text>{deal.description}</Text>
      <Text>Votes: {deal.vote_count}</Text>
      <Text>Comments:</Text>
      {deal.comments.map((comment, index) => (
        <Text key={index}>{comment}</Text>
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
});

export default DealDetailScreen;
