import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addComment } from '../../Managers/CommentManager';


export const CommentForm = ({ post }) => {


    const localTabloidUser = localStorage.getItem("userProfile");
    const tabloidUserObject = JSON.parse(localTabloidUser);

    const [comment, setComment] = useState({
        Subject: "",
        Content: "",
        UserProfileId: tabloidUserObject.id,
        PostId: post.id,
        CreateDateTime: new Date(),
    })

    const handleControlledInputChange = (e) => {

        const newComment = { ...comment }

        newComment[`${e.target.name}`] = e.target.value

        setComment(newComment)
    }

    const navigate = useNavigate();

    const saveComment = (e) => {
        e.preventDefault()

        const entryToSend = {
            ...comment
        }

        addComment(entryToSend)
            .then((p) => {
                p.json()
                    .then(comment => {
                        navigate(`/posts/${post.id}`)
                    })
            }
            )

            .then(setComment({
                Subject: "",
                Content: "",
                UserProfileId: tabloidUserObject.id,
                PostId: post.id,
                CreateDateTime: new Date(),
            }))

            .catch(error => {
                console.error('Error adding comment:', error);
                // Handle errors here, such as displaying an error message to the user
            });
    }

    return (
        <Form onSubmit={saveComment}>
            <fieldset>
                <FormGroup>
                    <Label htmlFor="Subject">Subject</Label>
                    <Input id="Subject" name="Subject" type="text" value={comment.Subject} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="Content">Content</Label>
                    <Input id="Content" name="Content" type="text" value={comment.Content} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Button>Save Comment</Button>
                </FormGroup>
            </fieldset>
        </Form>


    )
}

export default CommentForm;