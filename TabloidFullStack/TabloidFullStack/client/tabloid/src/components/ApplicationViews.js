import React from "react";
import { Route, Routes } from "react-router-dom";
import UserProfileList from "./UserProfiles/UserProfileList";
import PostList from "./posts/PostList";
import UserPostList from "./posts/MyPostList";
import UserProfileDetails from "./UserProfiles/UserProfileDetails";
import PostDetails from "./posts/PostDetails";
import PostForm from "./posts/PostForm";
import {TagList}  from "./tags/TagList";
import TagForm from "./tags/TagForm";
import SubcriptionList from "./Hello";
import Hello from "./Hello";
import { CategoryList } from "./categories/CategoryList";
import CategoryForm from "./categories/CategoryForm";
import { EditCategory } from "./categories/CategoryEdit";
import SubcriptionList from "./Hello";
import { EditTag } from "./tags/TagEdit";

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
        <Route path="/categories/form" element={<CategoryForm/>} />
        <Route path="/categories/edit/:id" element={<EditCategory/>} />
        <Route path="/tag" element={<TagList/>} />
        <Route path="/categories" element={<CategoryList/>} />
        <Route path="/tag/form" element={<TagForm/>} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/form" element={<CategoryForm/>} />
        <Route path="/categories/edit/:id" element={<EditCategory/>} />
        <Route path="/tag/edit/:id" element={<EditTag/>}/>
      </Routes>
    </>
  );

}