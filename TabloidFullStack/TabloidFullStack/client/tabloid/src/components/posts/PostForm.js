import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { addPost } from '../../Managers/PostManager';
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllCategories } from "../../Managers/CategoryManager";


export const PostForm = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        getAllCategories().then((categories) => setCategories(categories));
    }

    useEffect(() => {
        getCategories();
    }, []);

    const localTabloidUser = localStorage.getItem("userProfile");
    const tabloidUserObject = JSON.parse(localTabloidUser);

    const [postEntry, setPostEntry] = useState({
        Title: "",
        ImageLocation: "",
        Content: "",
        UserProfileId: tabloidUserObject.id,
        CategoryId: "",
        IsApproved: true,
        CreateDateTime: new Date(),
        PublishDateTime: "",
    })

    const handleControlledInputChange = (e) => {

        const newPostEntry = { ...postEntry }

        newPostEntry[`${e.target.name}`] = e.target.value

        setPostEntry(newPostEntry)
    }

    const handleCheckboxChange = (e) => {
        const newPostEntry = { ...postEntry };
        newPostEntry.IsApproved = e.target.checked;
        setPostEntry(newPostEntry);
    };


    const updatePostState = () => {
        // Fetch the updated list of posts from the backend or update the existing state
        // Example: You can fetch the updated list of posts from the backend and set it as the new state
        fetch('/api/posts') // Assuming this endpoint retrieves all posts
            .then(response => response.json())
            .then(postsData => {
                // Update the component state with the new list of posts
                setPostEntry(postsData); // Assuming setPosts is your state update function
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    };

    const navigate = useNavigate();

    const saveEntry = (e) => {
        e.preventDefault()

        const entryToSend = {
            ...postEntry,
            UserProfileId: tabloidUserObject.id,
            CreateDateTime: new Date(),
        }

        addPost(entryToSend)
            .then((p) => {
                p.json()
                    .then(post => {
                        navigate(`/posts/${post.id}`)
                    })
            }
            )

            .then(setPostEntry({
                Title: "",
                ImageLocation: "",
                Content: "",
                UserProfileId: tabloidUserObject.id,
                CategoryId: "",
                IsApproved: true,
                CreateDateTime: new Date(),
                PublishDateTime: "",
            }))

            .catch(error => {
                console.error('Error adding post:', error);
                // Handle errors here, such as displaying an error message to the user
            });
    }

    return (
        <Form onSubmit={saveEntry}>
            <fieldset>
                <FormGroup>
                    <Label htmlFor="Title">Title</Label>
                    <Input id="Title" name="Title" type="text" value={postEntry.Title} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="Content">Content</Label>
                    <Input id="Content" name="Content" type="text" value={postEntry.Content} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="ImageLocation">Image URL</Label>
                    <Input id="ImageLocation" name="ImageLocation" type="text" value={postEntry.ImageLocation} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="PublishDateTime">Publish Date:</Label>
                    <Input id="PublishDateTime" type="date" name="PublishDateTime" value={postEntry.PublishDateTime} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="Category">Category</Label>
                    <Input type="select" name="CategoryId" id="Category" value={postEntry.CategoryId} onChange={handleControlledInputChange}>
                        <option value="">⬇️ Select a Category ⬇️</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input id="IsApproved" type="checkbox" defaultChecked={postEntry.IsApproved} onChange={handleCheckboxChange} />
                    <Label htmlFor="IsApproved">Approve Post </Label>
                </FormGroup>
                <FormGroup>
                    <Button>Save Post</Button>
                </FormGroup>
            </fieldset>
        </Form>


    )
}

export default PostForm;