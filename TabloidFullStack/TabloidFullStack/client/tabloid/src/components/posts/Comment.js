import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { deleteComment } from "../../Managers/CommentManager";

export const Comment = ({ comment }) => {

  const [modal, setModal] = useState(false);

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

  return (
<>
<div><strong>Subject:</strong> {comment.subject}</div>
<div><strong>Comment:</strong> {comment.content}</div>
<div><strong>Posted By:</strong> {comment?.userProfile?.displayName}</div>
<div><strong>Posted On:</strong> {createdDate}</div>
<div>
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
</>
  );
};