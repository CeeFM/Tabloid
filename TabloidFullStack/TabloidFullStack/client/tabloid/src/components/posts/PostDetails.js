import React, { useEffect, useState } from "react";
import { getPost } from "../../Managers/PostManager";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import { getcommentsbypostid } from "../../Managers/CommentManager";
import { Comment } from "./Comment"; 
import CommentForm from "./CommentForm";
import { getreactions } from "../../Managers/PostReactionManager";
import { PostReaction } from "./PostReaction";
import SubscriptionButton from "./SubscribeButton";

export const PostDetails = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [reactions, setReactions] = useState([]);
  const { id } = useParams();

  const getpostcomments = () => {
    getcommentsbypostid(id).then((thesecomments) => setComments(thesecomments));
  }

const getReaction = () => {
  getreactions().then((thesereactions) => setReactions(thesereactions));
}

  useEffect(() => {
    getPost(id).then(setPost).then(getpostcomments).then(getReaction);
;
  }, []);

  if (!post) {
    return null;
  }

  const commentContainer = document.getElementById("comments");
  const viewCommentBtn = document.getElementById("view-comments");
  const commentForm = document.getElementById("comment-form");
  const addCommentBtn = document.getElementById("add-comment");
  const createdDate = new Date(post.publishDateTime);
  const formattedDate = createdDate.toLocaleDateString('en-US');

  const showComments = () => {
    if (commentContainer.style.display != "block") {
      commentContainer.style.display = "block";
      viewCommentBtn.innerHTML = "Hide Comments";
    } else {
      commentContainer.style.display = "none";
      viewCommentBtn.innerHTML = "View Comments";
    }
  };

  const addComments = () => {
  if (commentForm.style.display != "block") {
    commentForm.style.display = "block";
    addCommentBtn.innerHTML = "Hide Comment Form";
  } else {
    commentForm.style.display = "none";
    addCommentBtn.innerHTML = "Add Comment";
  }
    };

  return (
    <>
      <div className="container d-flex justify-content-center">
        <Card className="m-4" >
          <CardBody>
            <p>
              <Link to={`/posts/${post.id}`}>
                <strong>{post.title}</strong>
              </Link>
            </p>
            <CardImg top src={post.imageLocation} style={{ width: '600px' }} />
            <p>{post.content}</p>
            <p>
              <Link to={`/users/${post.userProfile?.id}`}>
                {post.userProfile?.displayName}
              </Link>
            </p>
            <p>Published: {formattedDate}</p>
          </CardBody>
          <div className="text-center">

{reactions.map((reaction) => (
    <>
      <PostReaction key={reaction.id} post={post} reaction={reaction} />
    </>
  ))}
  </div>
          <SubscriptionButton post={post} />
        </Card>
      </div>
      <div className="text-center">
        <button className="btn btn-primary m-2" onClick={showComments} id="view-comments"> Hide Comments</button>
        <button className="btn btn-primary" onClick={addComments} id="add-comment"> Add Comment</button>
      </div>
      <div className="col-sm-12 col-md-6 offset-md-3" id="comment-form" style={{ display: "none" }}>
        <CommentForm post={post} />
      </div>
      <div className="col-sm-12 col-md-6 offset-md-3" id="comments" style={{display: "block"}}>
        <br />
        <div className="text-center"><strong>COMMENTS:</strong></div>
        <br />
        {comments.map((comment) => (
          <>
            <Comment key={comment.id} comment={comment} />
            <br />
          </>
        ))}
      </div>

    </>
  );
};

export default PostDetails;