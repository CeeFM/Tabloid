import React from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

function refreshPage() {
  window.location.reload();
}

export const Post = ({ deletePost, post, updatePostState }) => {

  const [showForm, setShowForm] = useState(false)
  const [editPost, setEditPost] = useState({})

  useEffect(() => {
    setEditPost(post)
  }, [])

  const handleControlledInputChange = (e) => {

    const newPostEntry = { ...editPost }

    newPostEntry[`${e.target.name}`] = e.target.value

    setEditPost(newPostEntry)
  }

  const UpdateEntry = (e) => {
    e.preventDefault()

    const entryToSend = { ...editPost,
    IsApproved: true }


    fetch(`https://localhost:5001/api/Post/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryToSend),
    }).then(r => r.json)
      .then(updatePostState)
      .then(() => setShowForm(false))
      .then(refreshPage)
  }

  return <>
    {!showForm ?
      <div className="container d-flex justify-content-center">
        <Card className="m-4" >
          <CardBody>
            <p>
              <Link to={`/posts/${post.id}`}>
                <strong>{post.title}</strong>
              </Link>
              </p>
              <CardImg top src={post.imageLocation} style={{ width: '600px' }} />
            <p>
            </p>
            <p>{post.content}</p>
            <p>
              <Link to={`/userprofiles/${post.userProfile?.id}`}>
                {post.userProfile?.displayName}
              </Link>
            </p>
          </CardBody>
          <button className="btn btn-warning" aria-label="edit" onClick={() => setShowForm(!showForm)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => { deletePost(post.id, updatePostState); refreshPage(); }}>
            Delete
          </button>
        </Card>
      </div>

      :

      <div className="container d-flex justify-content-center">
        <Card className="m-4" >
          <CardBody>
            <p>
              <input name="title" type="text" placeholder="" value={editPost.title} onChange={handleControlledInputChange} />
            </p>
            <p>
            <input name="imageLocation" type="text" placeholder="" value={editPost.imageLocation} onChange={handleControlledInputChange} />
            </p>
            <input name="content" type="text" placeholder="" value={editPost.content} onChange={handleControlledInputChange} />
          </CardBody>
          <button className="btn btn-success" onClick={(e) => UpdateEntry(e)}> Save </button>
          <button className="btn btn-info" onClick={() => setShowForm(!showForm)}> Cancel </button>
        </Card>
      </div>

    }

  </>
}