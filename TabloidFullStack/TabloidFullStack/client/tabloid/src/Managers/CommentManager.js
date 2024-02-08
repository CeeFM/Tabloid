const apiUrl = "https://localhost:5001";

export const getcommentsbypostid = (postid) => {
    return fetch(`${apiUrl}/api/comment/${postid}`)
      .then((r) => r.json());
  }

  