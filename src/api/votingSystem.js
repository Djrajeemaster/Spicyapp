
// Voting System in DealDetailScreen.js
const handleVote = async (type) => {
  try {
    await axios.post(`https://spicybeats.com/api/deals/${dealId}/vote`, { type });
    // Update vote count locally if needed
  } catch (err) {
    console.log('Error voting:', err);
  }
};

// Buttons for Upvote and Downvote
<Button title="Upvote" onPress={() => handleVote('up')} />
<Button title="Downvote" onPress={() => handleVote('down')} />
