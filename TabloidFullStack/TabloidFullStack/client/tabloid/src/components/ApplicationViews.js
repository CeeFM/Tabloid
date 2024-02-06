import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import UserProfileList from "./UserProfileList";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/users" element={<UserProfileList />} />
      </Routes>
   );
 
}