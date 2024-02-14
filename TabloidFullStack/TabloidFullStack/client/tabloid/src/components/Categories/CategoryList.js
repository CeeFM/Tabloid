import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../Managers/CategoryManager";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { deleteCategory } from "../../Managers/CategoryManager";


//export a list of Categories(and their Id)
export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  
  const getCategories = () => {
    getAllCategories().then(allCategories => setCategories(allCategories));
  };
  useEffect(() => {
    getCategories();
  }, []);
  
  const deleteCategoryById = (id) => {
    const confirmDelete = window.confirm("Do you really want to delete this category?");
    if (confirmDelete) {
      deleteCategory(id).then(() => {getCategories();})
    }
  }
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
                  <Button onClick={(e) => { e.preventDefault(); navigate(`/category/edit/${category.id}`);}}> Edit Category </Button>
                  <button className="table-button" onClick={() => deleteCategoryById(category.id)}>Delete</button>
                </tr>
              ))}
          </table>
          <a href="http://localhost:3000/category/form"><button>Add Category</button></a>
        </div>
  );
}