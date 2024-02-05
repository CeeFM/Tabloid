const baseUrl = '/api/post';

export const getAllPosts = () => {
  return fetch(baseUrl)
    .then((res) => res.json())
};

export const getAllPostsWithComments = () => {
  return fetch('https://localhost:5001/api/Post/GetWithComments')
    .then((res) => res.json())
};


export const addPost = (singlePost) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singlePost),
  });
};


export const getPost = (id, updatePostState) => {
  return fetch(`https://localhost:5001/api/Post/${id}`).then((res) => res.json())
  .then(updatePostState)
};

export const deletePost = (id, updatePostState) => {
  return fetch(`https://localhost:5001/api/Post/${id}`, { method: "DELETE" })
    .then(updatePostState)
}