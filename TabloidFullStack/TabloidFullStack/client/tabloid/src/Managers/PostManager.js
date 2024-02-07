const baseUrl = '/api/post';

export const getAllPosts = () => {
  return fetch(baseUrl)
    .then((res) => res.json())
};

export const getAllPostsByUser = (id) => {
  return fetch(`https://localhost:5001/api/Post/${id}`)
    .then((res) => res.json())
};

const updatePostState = () => {
  // Fetch the updated list of posts from the backend or update the existing state
  // Example: You can fetch the updated list of posts from the backend and set it as the new state
  fetch('/api/posts') // Assuming this endpoint retrieves all posts
      .then(response => response.json())
      .catch(error => {
          console.error('Error fetching posts:', error);
      });
};

export const getPost = (id, updatePostState) => {
  return fetch(`https://localhost:5001/api/Post/post/${id}`).then((res) => res.json())
  .then(updatePostState)
};

export const deletePost = (id, updatePostState) => {
  return fetch(`https://localhost:5001/api/Post/${id}`, { method: "DELETE" })
    .then(updatePostState)
}