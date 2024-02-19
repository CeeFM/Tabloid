const subUrl = 'https://localhost:5001/api/Subscription';

export const addSubscription = (singleSubscription) => {
    return fetch(subUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singleSubscription),
    });
  };

  export const deleteSubscription = (subscriberUserProfileId, providerUserProfileId) => {
    return fetch(`https://localhost:5001/api/Subscription/${subscriberUserProfileId}/${providerUserProfileId}`, { method: "DELETE" })
  }
  
  export const getAllSubscriptionsByUser = (id) => {
    return fetch(`https://localhost:5001/api/Subscription/${id}`)
      .then((res) => res.json())
  };
