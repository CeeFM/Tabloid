import React, { useEffect, useState } from "react";
import { getPost } from "../../Managers/PostManager";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import { getcommentsbypostid } from "../../Managers/CommentManager";
import { Comment } from "./Comment"; 

export const PostDetails = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const getpostcomments = () => {
    getcommentsbypostid(id).then((thesecomments) => setComments(thesecomments));
}

  useEffect(() => {
    getPost(id).then(setPost);
  }, []);

  useEffect(() => {
    getpostcomments();
  }, []);

  if (!post) {
    return null;
  }

  const commentContainer = document.getElementById("comments");
  const viewCommentBtn = document.getElementById("view-comments");
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
      </Card>
      </div>
      <div className="text-center">
      <button className="btn btn-primary" onClick={showComments} id="view-comments"> View Comments</button>
      </div>
      <div className="col-sm-12 col-md-6 offset-md-3" id="comments" style={{display: "none"}}>
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