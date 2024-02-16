import React, { useState } from 'react';
import { addSubscription, getAllSubscriptionsByUser } from '../../Managers/SubscriptionManager';

const SubscriptionButton = ({post}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscriptionClick = async () => {
    try {

      const localTabloidUser = localStorage.getItem('userProfile');
      const tabloidUserObject = JSON.parse(localTabloidUser);

      // Fetch user subscriptions
      const subscriptions = await getAllSubscriptionsByUser(tabloidUserObject.id);

      // Check if the user is already subscribed to the author
      const alreadySubscribed = subscriptions.some(
        subscription => subscription.ProviderUserProfileId === post.userProfileId
      );

      if (alreadySubscribed) {
        console.log('Already subscribed to this author');
        return;
      }

      // Assuming you have the necessary subscription data
      const subscriptionData = {
        SubscriberUserProfileId: tabloidUserObject.id,
        ProviderUserProfileId: post.userProfileId,
        BeginDateTime: new Date().toISOString(), // Replace with actual date
        EndDateTime: null,
      };
  
      // Make an HTTP POST request to your API endpoint
      const response = await addSubscription(subscriptionData);
  
      if (response.ok) {
        setIsSubscribed(true);
      } else {
        console.log("Try again :(")
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  return (
    <div>
        <button onClick={handleSubscriptionClick}>
          {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
        </button>
    </div>
  );
};

export default SubscriptionButton;
