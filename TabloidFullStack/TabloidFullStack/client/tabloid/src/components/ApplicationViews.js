import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import UserProfileList from "./UserProfileList";
import PostList from "./posts/PostList";
import UserPostList from "./posts/MyPostList";
import UserProfileDetails from "./UserProfileDetails";

export default function ApplicationViews() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/users" element={<UserProfileList />} />
        <Route path="/users/:id" element={<UserProfileDetails />} />
      </Routes>
      <Routes>
        <Route path="/posts" element={<PostList />} />
      </Routes>
      <Routes>
        <Route path="/userposts" element={<UserPostList />} />
      </Routes>
    </>
  );

}