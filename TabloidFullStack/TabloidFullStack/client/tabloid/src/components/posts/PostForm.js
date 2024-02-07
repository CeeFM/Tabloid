import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { addPost } from '../../Managers/PostManager';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export const PostForm = () => {

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
        PublishDateTime: new Date(),
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

        entryToSend.UserProfileId = 1

        addPost(entryToSend)
            .then((p) => {
                // Navigate the user back to the home route
                navigate("/");
            })

            .then(setPostEntry({
                Title: "",
                ImageLocation: "",
                Content: "",
                UserProfileId: tabloidUserObject.id,
                CategoryId: "",
                IsApproved: true,
                CreateDateTime: new Date(),
                PublishDateTime: new Date(),
            }))

            .then(updatePostState)

            .catch(error => {
                console.error('Error adding post:', error);
                // Handle errors here, such as displaying an error message to the user
            });
    }

    return (

        <form id="postForm" onSubmit={saveEntry}>
            <div className="field">
                <label className="label">Title</label>
                <div className="control">
                    <input name="Title" className="input" type="text" placeholder="Title of Post" value={postEntry.Title} onChange={handleControlledInputChange} />
                </div>
            </div>
            <div className="field">
                <label className="label">Image Url</label>
                <div className="control">
                    <input className="input" type="text" name="ImageLocation" value={postEntry.ImageLocation} onChange={handleControlledInputChange} />
                </div>
            </div>
            <div className="field">
                <label className="label">Caption</label>
                <div className="control">
                    <textarea name="Content" className="text" placeholder="Enter a caption" value={postEntry.Content} onChange={handleControlledInputChange}></textarea>
                </div>
            </div>
            <div className="form-outline datepicker">
            <label htmlFor="PublishDateTime" className="form-label">Publish Date: </label>
                <DatePicker
                    selected={postEntry.PublishDateTime}
                    onChange={(date) => setPostEntry({ ...postEntry, PublishDateTime: date })}
                    className="form-control"
                />
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="IsApproved"
                    checked={postEntry.IsApproved}
                    onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Approve Post?
                </label>
            </div>
            <div className="control">
                <button id="submitbutton" type="submit" className="button is-primary" onClick={saveEntry}>Submit</button>
            </div>

        </form>

    )
}

export default PostForm;