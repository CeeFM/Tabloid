import React, { useState } from 'react';

const SubscriptionButton = (profile) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const localTabloidUser = localStorage.getItem("userProfile");
  const tabloidUserObject = JSON.parse(localTabloidUser);

  // Function to handle the subscription button click
  const handleSubscriptionClick = () => {
    try {
      // Assuming you have the necessary subscription data
      const subscriptionData = {
        SubscriberUserProfileId: tabloidUserObject,
        ProviderUserProfileId: profile.id,
        BeginDateTime: new Date().toISOString(), // Replace with actual date
        EndDateTime: new Date().toISOString(), // Replace with actual date
      };

      // Make an HTTP POST request to your API endpoint
      const response = fetch('/api/Subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      if (response.ok) {
        setIsSubscribed(true);
        // Handle success (e.g., show a success message)
      } else {
        // Handle errors (e.g., show an error message)
        console.error('Error subscribing:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      {/* Display subscription status */}
      {isSubscribed ? (
        <p>You are subscribed!</p>
      ) : (
        <button onClick={handleSubscriptionClick}>Subscribe</button>
      )}
    </div>
  );
};

export default SubscriptionButton;
