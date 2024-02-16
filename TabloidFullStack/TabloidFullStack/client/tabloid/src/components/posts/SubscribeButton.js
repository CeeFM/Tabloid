import React, { useState } from 'react';
import { addSubscription, getAllSubscriptionsByUser } from '../../Managers/SubscriptionManager';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const SubscriptionButton = ({ post }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [modal, setModal] = useState(false); 
  const toggleModal = () => setModal(!modal); 

  const handleSubscriptionClick = async () => {
    try {

      // Logged in user date
      const localTabloidUser = localStorage.getItem('userProfile');
      const tabloidUserObject = JSON.parse(localTabloidUser);

      // Fetch user subscriptions
      const subscriptions = await getAllSubscriptionsByUser(tabloidUserObject.id);
      console.log(subscriptions);

      // set a conditional to check if pro
      const alreadySubscribed = subscriptions.some(
        subscription => subscription.providerUserProfileId === post.userProfileId
      );

      if (alreadySubscribed) {
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

  return (
    <div>
      <button onClick={handleSubscriptionClick}>
        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      </button>

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
