const apiUrl = "https://localhost:5001";

export const getreactions = () => {
    return fetch(`${apiUrl}/api/reaction/`)
      .then((r) => r.json());
  }

  export const getreactionbyid = (reactionid) => {
    return fetch(`${apiUrl}/api/reaction/${reactionid}`)
      .then((r) => r.json());
  }

export const getpostreactions = () => {
    return fetch(`${apiUrl}/api/postreaction/`)
      .then((r) => r.json());
  }

export const getpostreactionsbypostid = (postid) => {
    return fetch(`${apiUrl}/api/postreaction/${postid}`)
      .then((r) => r.json());
  }

  export const addPostReaction = (postReaction) => {
    return fetch(`${apiUrl}/api/postreaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postReaction),
    });
  };  
