import React, { useState } from 'react';

const SubscribeButton = ({ authorId, profile }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async () => {
    try {
      // Replace with your actual backend API endpoint
      const apiUrl = '/api/subscribe';
  
      // Replace with the authorId you want to subscribe to
      const authorId = profile.Id; // Example author ID
  
      // Make the API call
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ authorId }), // Pass relevant data
      });
  
      if (response.ok) {
        // Handle success (e.g., show a success message)
        setIsSubscribed(true);
      } else {
        // Handle error cases (e.g., invalid input, server error)
        console.error('Error subscribing:', response.statusText);
      }
    } catch (error) {
      console.error('Error while subscribing:', error);
    }
  };
  

  return (
    <div>
      {isSubscribed ? (
        <p>Subscribed!</p>
      ) : (
        <button onClick={handleSubscribe}>Subscribe</button>
      )}
    </div>
  );
};

export default SubscribeButton;
