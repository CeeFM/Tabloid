import React from "react";
import { Route, Routes } from "react-router-dom";
import UserProfileList from "./UserProfiles/UserProfileList";
import PostList from "./posts/PostList";
import UserPostList from "./posts/MyPostList";
import UserProfileDetails from "./UserProfiles/UserProfileDetails";
import PostDetails from "./posts/PostDetails";
import PostForm from "./posts/PostForm";
import CategoryForm from "./categories/CategoryForm";
import {EditCategory} from "./categories/CategoryEdit";
import {TagList}  from "./tags/TagList";
import {CategoryList} from "./categories/CategoryList";
import TagForm from "./tags/TagForm";
import SubcriptionList from "./Hello";
import Hello from "./Hello";

export default function ApplicationViews() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Hello/>}/>
        <Route path="/" element={<SubcriptionList />} />
        <Route path="/users" element={<UserProfileList />} />
        <Route path="/users/:id" element={<UserProfileDetails />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/addpost" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetails/>} />
        <Route path="/userposts" element={<UserPostList />} />
        <Route path="/tag" element={<TagList/>} />
        <Route path="/category" element={<CategoryList/>} />
        <Route path="/tag/form" element={<TagForm/>} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/form" element={<CategoryForm/>} />
        <Route path="/categories/edit/:id" element={<EditCategory/>} />

      </Routes>
    </>
  );

}