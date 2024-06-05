import React from "react";
import { useState } from "react";

import api from "../api";

const CreateCategory = ({ setIsAddingCategory }) => {
  const [categories, setCategories] = useState([]);

  const [newCategory, setNewCategory] = useState({
    title: "",
    description: "",
  });
  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };
  const handleAddCategory = async () => {
    try {
      const response = await api.post("/api/notes/category/", newCategory);
      setCategories([...categories, response.data]);
      setNewCategory({ title: "", description: "" });
      setIsAddingCategory(false)
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <>
        <div>
          <label>
            <strong>New Category:</strong>
          </label>
          <input
            type="text"
            name="title"
            value={newCategory.title}
            onChange={handleNewCategoryChange}
            className="border m-2 p-2 w-full"
          />
          <input
            type="text"
            name="description"
            value={newCategory.description}
            onChange={handleNewCategoryChange}
            className="border m-2 p-2 w-full"
          />
          <button
            onClick={handleAddCategory}
            className="border m-2 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
          >
            Add Category
          </button>
          <button
            onClick={() => setIsAddingCategory(false)}
            className="border m-2 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
          >
            Cancel
          </button>
        </div>
    </>
  );
};

export default CreateCategory;
