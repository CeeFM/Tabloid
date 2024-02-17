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
    
    const buttonChange = () => {
        if (reactionCount.length === 0 || userReactionCount.length === 0) {
            return <button className="btn btn-secondary m-1" onClick={addReaction}><img className="reaction-btn" alt="" src={reaction.imageLocation} /> {reactionCount.length} </button>  
        }
        else {
            return <button className="btn btn-secondary m-1" onClick={addReaction}><img className="reaction-btn" alt="" src={reaction.imageLocation} /> {reactionCount.length} </button>
        }
    };

    const userReactionCount = postReactionsList.filter((pr) => pr.userProfileId === tabloidUserObject.id && pr.reactionId === reaction.id);
    const reactionCount = postReactionsList.filter((pr) => pr.reactionId === reaction.id);

    return <>
        {reactionCount.length === 0 || userReactionCount.length === 0 ? (
            <>
                <button className="btn btn-secondary m-1" onClick={addReaction}>
                <img className="reaction-btn" alt="" src={reaction.imageLocation} />
                {reactionCount.length}
                </button>
            </>
        ) : (
            <button className="btn btn-primary m-1" >
            <img className="reaction-btn" alt="" src={reaction.imageLocation} />
            {reactionCount.length}
            </button> 
        )}
        </>

}

