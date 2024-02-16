import React, { useState, useEffect } from 'react';
import { getAllSubscriptionsByUser } from '../../Managers/SubscriptionManager';
import { getAllPostsByUser } from '../../Managers/PostManager';
import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

const PostsBySubscribedAuthors = () => {
    const [subposts, setSubposts] = useState([]);

    const localTabloidUser = localStorage.getItem('userProfile');
    const tabloidUserObject = JSON.parse(localTabloidUser);

    useEffect(() => {
        const fetchPosts = async () => {
             // Fetch all subscriptions for the current user
             const subscriptions = await getAllSubscriptionsByUser(tabloidUserObject.id); 
             
             let allPosts = [];
 
             // Iterate through subscriptions to fetch posts from each subscribed user
             for (const subscription of subscriptions) {
                 const authorId = subscription.providerUserProfileId;
                 // Fetch posts written by the subscribed author
                 const posts = await getAllPostsByUser(authorId);
                 // Concatenate the fetched posts to the existing array
                 allPosts = allPosts.concat(posts);
             }
 
             // Update the state with the fetched posts
             setSubposts(allPosts);
     };
        fetchPosts();
    }, []);

    return (
        <div>
            <h2>Your Feed:</h2>
            <ul>
                {subposts.map(subpost => (
                   <Card className="m-4" >
                   <CardBody>
                     <p>
                       <Link to={`/posts/${subpost.id}`}>
                         <strong>{subpost.title}</strong>
                       </Link>
                     </p>
                     <CardImg top src={subpost.imageLocation} style={{ width: '600px' }} />
                     <p>{subpost.content}</p>
                     <p>
                       <Link to={`/users/${subpost.userProfile?.id}`}>
                         {subpost.userProfile?.displayName}
                       </Link>
                     </p>
                   </CardBody>
                 </Card>
                ))}
            </ul>
        </div>
    );
};

export default PostsBySubscribedAuthors;
