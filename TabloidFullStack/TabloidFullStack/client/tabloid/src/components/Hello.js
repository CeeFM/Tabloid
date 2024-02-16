import React from "react";
import PostsBySubscribedAuthors from "./posts/SubscribedPosts";

export default function SubcriptionList() {
  const localTabloidUser = localStorage.getItem('userProfile');
  const tabloidUserObject = JSON.parse(localTabloidUser);

  return (
  <PostsBySubscribedAuthors id={tabloidUserObject.id} />
  );
}