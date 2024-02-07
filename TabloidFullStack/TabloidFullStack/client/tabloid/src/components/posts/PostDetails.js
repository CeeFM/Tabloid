import React, { useEffect, useState } from "react";
import { getPost } from "../../Managers/PostManager";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

export const PostDetails = () => {
  const [post, setPost] = useState();
  const { id } = useParams();


  useEffect(() => {
    getPost(id).then(setPost);
  }, []);

  if (!post) {
    return null;
  }

  const createdDate = new Date(post.publishDateTime);
  const formattedDate = createdDate.toLocaleDateString('en-US');

  return (
    <div className="container d-flex justify-content-center">
      <Card className="m-4" >
        <CardBody>
          <p>
            <Link to={`/posts/${post.id}`}>
              <strong>{post.title}</strong>
            </Link>
            {/* <CardImg top src={post.ImageLocation} style={{ width: '600px' }} /> */}
          </p>
          <p>{post.content}</p>
          <p>
          <Link to={`/userprofiles/${post.userProfile?.id}`}>
            {post.userProfile?.displayName}
          </Link>
          </p>
          <p>Published: {formattedDate}</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default PostDetails;