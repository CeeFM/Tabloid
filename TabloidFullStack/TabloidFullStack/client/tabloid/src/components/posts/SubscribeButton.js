import React, { useState, useEffect } from 'react';
import { addSubscription, getAllSubscriptionsByUser, deleteSubscription } from '../../Managers/SubscriptionManager';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const SubscriptionButton = ({ post }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [modal, setModal] = useState(false); 
  const toggleModal = () => setModal(!modal); 

  // checks for subscription
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const localTabloidUser = localStorage.getItem('userProfile');
        const tabloidUserObject = JSON.parse(localTabloidUser);
        const subscriptions = await getAllSubscriptionsByUser(tabloidUserObject.id);
        const alreadySubscribed = subscriptions.some(
          subscription => subscription.providerUserProfileId === post.userProfileId
        );
        setIsSubscribed(alreadySubscribed);
      } catch (error) {
        console.error('Error checking subscription:', error.message);
      }
    };

    checkSubscription();
  }, [post.userProfileId]);

  // handles adding a subscription
  const handleSubscriptionClick = async () => {
    try {

      // Logged in user date
      const localTabloidUser = localStorage.getItem('userProfile');
      const tabloidUserObject = JSON.parse(localTabloidUser);

      // Fetch user subscriptions
      const subscriptions = await getAllSubscriptionsByUser(tabloidUserObject.id);
      console.log(subscriptions);

      // Set a conditional to check if the userprofileID for the provider matches the post userProfileId
      const alreadySubscribed = subscriptions.some(
        subscription => subscription.providerUserProfileId === post.userProfileId
      );

      if (alreadySubscribed) {
        setIsSubscribed(true);
        toggleModal();
        return;
      }

      // subscription data
      const subscriptionData = {
        SubscriberUserProfileId: tabloidUserObject.id,
        ProviderUserProfileId: post.userProfileId,
        BeginDateTime: new Date().toISOString(), 
        EndDateTime: null,
      };

      // HTTP POST request 
      const response = await addSubscription(subscriptionData);

      // If the response if okay set isSubscribed to true 
      if (response.ok) {
        setIsSubscribed(true);
      } else {
        console.log("Try again :(")
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

   // handles unsubscribing to a user 
   const handleUnsubscribeClick = async () => {
    try {
      const localTabloidUser = localStorage.getItem('userProfile');
      const tabloidUserObject = JSON.parse(localTabloidUser);
      const response = await deleteSubscription(tabloidUserObject.id, post.userProfileId);

      if (response.ok) {
        setIsSubscribed(false);
      } else {
        console.log("Error unsubscribing");
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <Button onClick={isSubscribed ? handleUnsubscribeClick : handleSubscriptionClick}
       style={{ backgroundColor: isSubscribed ? 'rgb(255, 51, 53)' : 'rgb(0, 204, 153)' }}>
        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      </Button>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Already Subscribed</ModalHeader>
        <ModalBody>
          You are already subscribed to this author.
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SubscriptionButton;
