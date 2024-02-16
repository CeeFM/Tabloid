import React, { useState } from 'react';
import { addSubscription, getAllSubscriptionsByUser } from '../../Managers/SubscriptionManager';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const SubscriptionButton = ({ post }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [modal, setModal] = useState(false); // State for controlling the modal

  const toggleModal = () => setModal(!modal); // Function to toggle the modal

  const handleSubscriptionClick = async () => {
    try {

      const localTabloidUser = localStorage.getItem('userProfile');
      const tabloidUserObject = JSON.parse(localTabloidUser);

      // Fetch user subscriptions
      const subscriptions = await getAllSubscriptionsByUser(tabloidUserObject.id);
      console.log(subscriptions);

      const alreadySubscribed = subscriptions.some(
        subscription => subscription.providerUserProfileId === post.userProfileId
      );

      if (alreadySubscribed) {
        toggleModal(); // Show the modal if already subscribed
        return;
      }

      // subscription data
      const subscriptionData = {
        SubscriberUserProfileId: tabloidUserObject.id,
        ProviderUserProfileId: post.userProfileId,
        BeginDateTime: new Date().toISOString(), // Replace with actual date
        EndDateTime: null,
      };

      // HTTP POST request 
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

      {/* Modal component */}
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
