import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { deleteComment } from "../../Managers/CommentManager";

export const Comment = ({ comment }) => {

  const [modal, setModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editComment, setEditComment] = useState({});

  useEffect(() => {
    setEditComment(comment)
  }, [])

  const toggle = () => setModal(!modal);

  const createdDate = new Date(comment.createDateTime).toLocaleDateString('en-US');

  function refreshPage() {
      window.location.reload();
  };

  const deleteThis = () => {
    let id = comment.id;
    deleteComment(id);
   refreshPage();
  };

  const UpdateEntry = (e) => {
   e.preventDefault();
  const entryToSend = { ...editComment};
  fetch(`https://localhost:5001/api/Comment/${comment.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entryToSend),
  }).then(r => r.json)
    .then(refreshPage)
};

const handleControlledInputChange = (e) => {

  const newComment = { ...editComment };

  newComment[`${e.target.name}`] = e.target.value;

  setEditComment(newComment);
}

  return <>
{!showForm ?
<div>
<div><strong>Subject:</strong> {comment.subject}</div>
<div><strong>Comment:</strong> {comment.content}</div>
<div><strong>Posted By:</strong> {comment?.userProfile?.displayName}</div>
<div><strong>Posted On:</strong> {createdDate}</div>
<div>
<Button color="warning" onClick={() => setShowForm(!showForm)}>EDIT</Button>
      <Button color="danger" onClick={toggle}>
        DELETE
      </Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>CONFIRM DELETION</ModalHeader>
        <ModalBody>
You sure about that? You really wanna delete <strong>{comment.subject}</strong> by <strong>{comment?.userProfile?.displayName}</strong>? For realzies?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteThis}>
            Confirm (for realzies)
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
</div>
:
<div className="container d-flex justify-content-center">
<Card className="m-4" >
  <CardBody>
    <p>
      <input name="subject" type="text" placeholder="" value={editComment.subject} onChange={handleControlledInputChange} />
    </p>
    <p>
    <input name="content" type="text" placeholder="" value={editComment.content} onChange={handleControlledInputChange} />
    </p>
    <div className="text-center">
    <button className="btn btn-warning" onClick={(e) => UpdateEntry(e)}> Save </button>
  <button className="btn btn-secondary" onClick={() => setShowForm(!showForm)}> Cancel </button>
  </div>
  </CardBody>
</Card>
</div>
}
</>
};