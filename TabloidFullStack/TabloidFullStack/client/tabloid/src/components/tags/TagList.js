import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTags } from "../../Managers/TagManager";
import { deleteTagById } from "../../Managers/TagManager";
import { deleteTag } from "../../Managers/TagManager";
import { Button } from "reactstrap";

export const TagList = () => {
    const [tags, setTags] = useState([]);
  
    const navigate = useNavigate();
    
    const getTags = () => {
      getAllTags().then(allTags => setTags(allTags));
    };
    useEffect(() => {
      getTags();
    }, []);

    const deleteTagById = (id) => {
      const confirmDelete = window.confirm("Do you want to delete this tag?");
      if (confirmDelete) {
        deleteTag(id).then(() => {getTags();})
      }
    }

    //returning a table.
return (
    <div>
      <table>
          <tr>
            <th>Id</th>
            <th>Tag Name</th>
          </tr>
          {tags.map((tag) => (
            <tr key={tag.id} >
              <td>{tag.id}</td>
              <td>{tag.name}</td>
              <button className="table-button" onClick={() => deleteTagById(tag.id)}>Delete</button>
              <Button onClick={(e) => { e.preventDefault(); navigate(`/tag/edit/${tag.id}`);}}> Edit Tag </Button>
            </tr>
          ))}
      </table>
      <a href="http://localhost:3000/tag/form"><button>Add Tag</button></a>
    </div>
);
}