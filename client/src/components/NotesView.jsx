
import React, { useContext, useState, useEffect } from "react"; 
import api from "../api";

const NotesView = ({user_id,isrefresh}) => {
  const [Notes, setNotes] = useState([]);
  const [showFullText, setShowFullText] = useState({});

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        var response
        if(user_id != null){
            response = await api.get(`/api/notes/user/${user_id}`);
        }
        else{
        response = await api.get(`/api/notes/`);}
        setNotes(response.data);
      } catch (error) {
        console.error("Failed to fetch news posts", error);
      }
    };
    fetchNotes();
  }, [isrefresh]);

  const toggleShowMore = (id) => {
    setShowFullText((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {Notes.map((note) => {
          const words = note.description.split(" ");
          const shouldShowMore = words.length > 10;
          const textToDisplay = showFullText[note.id]
            ? note.description
            : words.slice(0, 10).join(" ") + (shouldShowMore ? "..." : "");

          return (
            <div
              key={note.id}
              className="border p-2 m-2 bg-slate-200 rounded-lg"
            >
              <h3 className="font-bold underline">{note.title}</h3>
              <p>{textToDisplay}</p>
              {shouldShowMore && (
                <button
                  onClick={() => toggleShowMore(note.id)}
                  className="text-blue-500 underline"
                >
                  {showFullText[note.id] ? "Show Less" : "Show More"}
                </button>
              )}
              <p className="font-sm text-gray-500">By: {note.author}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NotesView;
