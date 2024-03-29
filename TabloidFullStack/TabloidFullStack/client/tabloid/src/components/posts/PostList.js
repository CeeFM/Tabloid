import React, { useState, useEffect } from "react";
import { getAllPosts } from "../../Managers/PostManager";
import { deletePost } from "../../Managers/PostManager";
import { Post } from "./Posts";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    getAllPosts().then(allPosts => setPosts(allPosts)); 
  };

  useEffect(() => {
    getPosts();
  }, []); 
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {posts.map((post) => (
            <Post key={post.id} post={post} deletePost={deletePost} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;