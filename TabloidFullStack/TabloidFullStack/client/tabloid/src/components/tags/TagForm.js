import React, { useState } from 'react';
import { addTag } from '../../Managers/TagManager';
import { useNavigate } from 'react-router';

  const TagForm = ({ onSave }) => {
  const [newTagName, setNewTagName] = useState('');
  const navigate = useNavigate()
  const handleSave = async (e) => {
    e.preventDefault(); 
    try {
      const newTag = {
        name: newTagName,
      };
      const response = await addTag(newTag);
      if (response.ok) {
        onSave();
        setNewTagName('');
      } else {
        console.error('Failed to add tag:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding tag:', error);
    }
    navigate('/tag');
  };
  return (
    <div className='tag-form'>
      <h1>Create a new Tag</h1>
      <form onSubmit={handleSave}>
        <label>
          Tag Name:
          <input type="text" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
export default TagForm;