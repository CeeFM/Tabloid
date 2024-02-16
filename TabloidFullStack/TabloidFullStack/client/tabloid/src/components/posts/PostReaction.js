import React, { useEffect, useState } from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import { addPostReaction } from "../../Managers/PostReactionManager";

export const PostReaction = ({ post, reaction }) => {
    const localTabloidUser = localStorage.getItem("userProfile");
	const tabloidUserObject = JSON.parse(localTabloidUser);

    const [postReaction, setPostReaction] = useState({
        UserProfileId: tabloidUserObject.id,
        ReactionId: reaction.id,
        PostId: post.id
    });

    const addReaction = () => {
        const reactionToSend = {
            ...postReaction
        }
        addPostReaction(reactionToSend)
      };

    return <button className="btn btn-secondary m-1" onClick={addReaction}><img className="reaction-btn" src={reaction.imageLocation} />  </button>

}

