import React, { useEffect, useState } from "react";
import { addPostReaction, getpostreactionsbypostid } from "../../Managers/PostReactionManager";

export const PostReaction = ({ post, reaction }) => {
    const localTabloidUser = localStorage.getItem("userProfile");
	const tabloidUserObject = JSON.parse(localTabloidUser);

    const [postReaction, setPostReaction] = useState({
        UserProfileId: tabloidUserObject.id,
        ReactionId: reaction.id,
        PostId: post.id
    });

    const [postReactionsList, setPostReactionsList] = useState([]);

    const getPostsReactions = () => {
        getpostreactionsbypostid(post.id).then((postReactions) => {
        setPostReactionsList(postReactions);
        console.log(postReactionsList);
    })
    .catch((error) => {
        console.error("OOPS I FUCKED UP WITH THIS ERROR:" , error);
    });
};

    useEffect(() => {
        getPostsReactions();
      }, []);

    const addReaction = () => {
        const reactionToSend = {
            ...postReaction
        };
        addPostReaction(reactionToSend)
        .then(() => getPostsReactions());
        window.location.reload();
      };
    
    const logState = () => {
        console.log(reactionCount)
    };

    const reactionCount = postReactionsList.filter((pr) => pr.reactionId === reaction.id);

    return <button className="btn btn-secondary m-1" onClick={addReaction}><img className="reaction-btn" alt="" src={reaction.imageLocation} /> {reactionCount.length} </button>

}

