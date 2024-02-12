import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../Managers/CategoryManager";

//export a list of Categories(and their Id)
export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    getAllCategories().then(allCategories => setCategories(allCategories));
  };
  useEffect(() => {
    getCategories();
  }, []);
//returning a table.
return (
        <div>
          <table>
              <tr>
                <th>Id</th>
                <th>Category Name</th>
              </tr>
              {categories.map((category) => (
                <tr key={category.id} >
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                </tr>
              ))}
          </table>
        </div>
  );
}