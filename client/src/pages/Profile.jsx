import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import api from "../api";
import NotesView from "../components/NotesView";
import CreateNote from "../components/CreateNote";
import CreateCategory from "../components/CreateCategory";

const Profile = () => {
  const [IsAddingCategory, setIsAddingCategory] = useState(false);
  const [isrefresh,setisrefresh]=useState(false)
  const { user, setUser, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);

  const [editFields, setEditFields] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFields({
      ...editFields,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditFields({
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      address: user.address,
      role: user.role,
      designation: user.designation,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await api.put(`/api/auth/user/${user.id}/`, editFields);
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDeleteClick = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await api.delete(`/api/auth/user/${user.id}/`);
        logout();
        <Navigate to="/" />;
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {user ? (
        <div>
          {isEditing ? (
            <>
              <div>
                <label>
                  <strong>Username:</strong>
                </label>
                <input
                  type="text"
                  name="username"
                  value={editFields.username}
                  onChange={handleInputChange}
                  className="border m-2 p-2"
                />
              </div>
              <div>
                <label>
                  <strong>First Name:</strong>
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={editFields.first_name}
                  onChange={handleInputChange}
                  className="border m-2 p-2"
                />
              </div>
              <div>
                <label>
                  <strong>Last Name:</strong>
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={editFields.last_name}
                  onChange={handleInputChange}
                  className="border m-2 p-2"
                />
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>
                <input
                  type="text"
                  name="email"
                  value={editFields.email}
                  onChange={handleInputChange}
                  className="border m-2 p-2"
                />
              </div>
              <div>
                <label>
                  <strong>Address:</strong>
                </label>
                <input
                  type="text"
                  name="address"
                  value={editFields.address}
                  onChange={handleInputChange}
                  className="border m-2 p-2"
                />
              </div>
              <div>
                <label>
                  <strong>Role:</strong>
                </label>
                <input
                  type="text"
                  name="role"
                  value={editFields.role}
                  onChange={handleInputChange}
                  className="border m-2 p-2"
                />
              </div>
              <div>
                <label>
                  <strong>Designation:</strong>
                </label>
                <input
                  type="text"
                  name="designation"
                  value={editFields.designation}
                  onChange={handleInputChange}
                  className="border m-2 p-2"
                />
              </div>
              <div className="flex mt-4">
                <button
                  onClick={handleSubmit}
                  className="border m-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
                <button
                  onClick={handleCancelClick}
                  className="border m-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2">
                <p className="m-2 p-2 ">
                  <strong>Username:</strong> {user.username}
                </p>
                <p className="m-2 p-2 ">
                  <strong>First Name:</strong> {user.first_name}
                </p>
                <p className="m-2 p-2 ">
                  <strong>Last Name:</strong> {user.last_name}
                </p>
                <p className="m-2 p-2 ">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="m-2 p-2 ">
                  <strong>Address:</strong> {user.address}
                </p>
                <p className="m-2 p-2 ">
                  <strong>Role:</strong> {user.role}
                </p>
                <p className="m-2 p-2 ">
                  <strong>Designation:</strong> {user.designation}
                </p>
              </div>
              <button
                onClick={handleEditClick}
                className="border m-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="border m-2 p-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Delete Account
              </button>
            </>
          )}

          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Notes</h2>
            <button
              onClick={() => {setIsAddingNote(true); setIsAddingCategory(false)}}
              className="border m-2 p-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Add Note
            </button>
            <button
              onClick={() => {setIsAddingCategory(true); setIsAddingNote(false)}}
              className="border m-2 p-2 bg-yellow-500 text-white rounded hover:bg-green-700"
            >
              Add category
            </button>
            {isAddingNote && <CreateNote setIsAddingNote={setIsAddingNote} setisrefresh={setisrefresh}/>}
            {IsAddingCategory && <CreateCategory setIsAddingCategory={setIsAddingCategory}/>}

            <NotesView user_id={user.id} isrefresh={isrefresh}/>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
