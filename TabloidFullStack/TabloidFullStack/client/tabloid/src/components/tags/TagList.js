import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTags } from "../../Managers/TagManager";

export const TagList = () => {
    const [tags, setTags] = useState([]);
  
    const navigate = useNavigate();
    
    const getTags = () => {
      getAllTags().then(allTags => setTags(allTags));
    };
    useEffect(() => {
      getTags();
    }, []);

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
            </tr>
          ))}
      </table>
    </div>
);
}