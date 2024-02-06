import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

function refreshPage() {
  window.location.reload();
}

export const Post = ({ deletePost, post, updatePostState }) => {
  return (
    <div className="container d-flex justify-content-center">
      <Card className="m-4" >
        <CardBody>
          <p>
            <Link to={`/posts/${post.id}`}>
              <strong>{post.title}</strong>
            </Link>
          </p>
          <p>{post.content}</p>
          <p>
          <Link to={`/userprofiles/${post.userProfile.id}`}>
            {post.userProfile?.displayName}
          </Link>
          </p>
        </CardBody>
        <button className="btn btn-danger" onClick={() => {deletePost(post.id, updatePostState); refreshPage(); }}>
          Delete
        </button>
      </Card>
    </div>
  );
};