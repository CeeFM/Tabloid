import React, { useState } from 'react';
import { addCategory } from '../../Managers/CategoryManager';
import { useNavigate } from 'react-router';

  const CategoryForm = ({ onSave }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const navigate = useNavigate()
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const newCategory = {
        name: newCategoryName,
      };
      const response = await addCategory(newCategory);
      if (response.ok) {
        onSave();
        setNewCategoryName('');
      } else {
        console.error('Failed to add category:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
    navigate('/category');
  };
  return (
    <div className='category-form'>
      <h1>Create a new Category</h1>
      <form onSubmit={handleSave}>
        <label>
          Category Name:
          <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
export default CategoryForm;