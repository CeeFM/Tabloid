import React, { useState, useEffect } from 'react';
import { getAllSubscriptionsByUser } from '../../Managers/SubscriptionManager';
import { getAllPostsByUser } from '../../Managers/PostManager';

const PostsBySubscribedAuthors = () => {
    const [subposts, setSubposts] = useState([]);

    const localTabloidUser = localStorage.getItem('userProfile');
    const tabloidUserObject = JSON.parse(localTabloidUser);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch all subscriptions for the current user
                const subscriptions = await getAllSubscriptionsByUser(tabloidUserObject.id); 
                // Get the list of author IDs from subscriptions
                const authorIds = subscriptions.map(subscription => subscription.ProviderUserProfileId);
                // Fetch posts written by the subscribed authors
                const posts = await getAllPostsByUser(authorIds);
                // Update the state with the fetched posts
                setSubposts(posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h2>Your Feed:</h2>
            <ul>
                {subposts.map(subpost => (
                    <li key={subpost.id}>{subpost.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default PostsBySubscribedAuthors;
