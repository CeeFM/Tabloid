import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import UserProfileList from "./UserProfiles/UserProfileList";
import PostList from "./posts/PostList";
import UserPostList from "./posts/MyPostList";
import UserProfileDetails from "./UserProfiles/UserProfileDetails";
import PostDetails from "./posts/PostDetails";
import PostForm from "./posts/PostForm";
import { CategoryList } from "./Categories/CategoryList";
import CategoryForm from "./Categories/CategoryForm";
import { EditCategory } from "./Categories/CategoryEdit";


export default function ApplicationViews() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/users" element={<UserProfileList />} />
        <Route path="/users/:id" element={<UserProfileDetails />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/addpost" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetails/>} />
        <Route path="/userposts" element={<UserPostList />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/category/form" element={<CategoryForm/>} />
        <Route path="/category/edit/:id" element={<EditCategory/>} />

      </Routes>
    </>
  );

}