import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

function refreshPage() {
    window.location.reload();
}

export const Post = ({deletePost}) => {

    const [post, setPost] = useState({
        Title: "",
        Content: "",
        ImageLocation: "",
        PublishDateTime: new Date(),
        CreateDateTime: new Date(),
        CategoryId: "",
        UserProfileId: "",
    })

    const updatePostState = () => {
        // Fetch the updated list of posts from the backend or update the existing state
        // Example: You can fetch the updated list of posts from the backend and set it as the new state
        fetch('/api/posts') // Assuming this endpoint retrieves all posts
            .then(response => response.json())
            .then(postsData => {
                // Update the component state with the new list of posts
                setPost(postsData); // Assuming setPosts is your state update function
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    };

    return (
        <div className="container d-flex justify-content-center">
            <Card className="m-4" >
                <CardBody>
                    <p>
                        <Link to={`/posts/${post.id}`}>
                            <strong>{post.title}</strong>
                        </Link>
                    </p>
                    <Link to={`/userprofiles/${post.userProfile.id}`}>
                        <p>Posted by: {post.userProfile.name}</p>
                    </Link>
                    <p>Category: {post.CategoryId}</p>
                </CardBody>
                <button className="btn btn-danger" onClick={() => {deletePost(post.id, updatePostState); refreshPage(); }}>
                    Delete
                </button>
            </Card>
        </div>
    );
};