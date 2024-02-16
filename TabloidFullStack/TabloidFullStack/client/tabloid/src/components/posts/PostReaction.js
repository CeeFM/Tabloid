import React, { useEffect, useState } from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import { addPostReaction, getreactions } from "../../Managers/PostReactionManager";

export const PostReaction = ({ post, reaction }) => {

    return <button className="btn btn-secondary m-1"><img className="reaction-btn" src={reaction.imageLocation} />  </button>

}

