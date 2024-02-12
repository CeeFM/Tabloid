import React from "react";

const baseUrl = 'https://localhost:5001/api/Category';

export const getAllCategories = () => {
    return fetch(baseUrl) 
    .then((res) => {
        return res.json();
    })
}