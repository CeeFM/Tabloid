const apiUrl = "https://localhost:5001";

export const getcommentsbypostid = (postid) => {
    return fetch(`${apiUrl}/api/comment/${postid}`)
      .then((r) => r.json());
  }

  export const addComment = (singleComment) => {
    return fetch(`${apiUrl}/api/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singleComment),
    });
  };  

  export const deleteComment = (id) => {
    return fetch(`https://localhost:5001/api/Comment/${id}`, { method: "DELETE" });
  };