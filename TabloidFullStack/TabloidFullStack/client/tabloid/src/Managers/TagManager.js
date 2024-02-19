
const baseUrl = 'https://localhost:5001/api/Tag';

export const getAllTags = () => {
    return fetch(baseUrl) 
    .then((res) => {
        return res.json();
    })
}

export const addTag = (singleTag) => {
    return fetch(baseUrl, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singleTag),
    });
};
}
