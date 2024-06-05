import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import api from "../api";

const CreateNote = ({setIsAddingNote,setisrefresh}) => {
  const [categories, setCategories] = useState([]);
  const [Notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    category: "",
    description: "",
    visibility: "public",
  });
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/notes/category/");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);
  const handleNewNoteChange = (e) => {
    const { name, value } = e.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };
  const handleAddNote = async () => {
    try {
      console.log("New Note Data:", newNote);
      const response = await api.post("/api/notes/", newNote);
      console.log("Note Added Response:", response.data);
      setNotes([...Notes, response.data]);
      setIsAddingNote(false);
      setNewNote({
        title: "",
        category: "",
        description: "",
        visibility: "public",
      });
      setisrefresh(true)
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };
  return (
    <>
      <div className="border p-4 m-2 bg-gray-100 rounded">
        <div>
          <label>
            <strong>Title:</strong>
          </label>
          <input
            type="text"
            name="title"
            value={newNote.title}
            onChange={handleNewNoteChange}
            className="border m-2 p-2 w-full"
          />
        </div>
        <div>
          <label>
            <strong>Category:</strong>
          </label>
          <select
            name="category"
            value={newNote.category}
            onChange={handleNewNoteChange}
            className="border m-2 p-2 w-full"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>
            <strong>Description:</strong>
          </label>
          <textarea
            name="description"
            value={newNote.description}
            onChange={handleNewNoteChange}
            className="border m-2 p-2 w-full"
          />
        </div>
        <div>
          <label>
            <strong>Visibility:</strong>
          </label>
          <select
            name="visibility"
            value={newNote.visibility}
            onChange={handleNewNoteChange}
            className="border m-2 p-2 w-full"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button
          onClick={handleAddNote}
          className="border m-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add Note
        </button>
        <button
          onClick={() => setIsAddingNote(false)}
          className="border m-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default CreateNote;
