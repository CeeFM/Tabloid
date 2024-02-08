import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Comment = ({ comment }) => {

    const createdDate = new Date(comment.createDateTime).toLocaleDateString('en-US');

function refreshPage() {
    window.location.reload();
};

  return (
<>
<div><strong>Subject:</strong> {comment.subject}</div>
<div><strong>Comment:</strong> {comment.content}</div>
<div><strong>Posted By:</strong> {comment?.userProfile?.displayName}</div>
<div><strong>Posted On:</strong> {createdDate}</div>
</>
  );
};