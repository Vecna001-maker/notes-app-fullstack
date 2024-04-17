import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000";

  const NotesInitial = [
    {
      "_id": "6568b73194b8914526994bb7",
      "user": "65683dce2ffc79d2c7d40b8c",
      "title": "Task for Today",
      "description": "exams aa rhe hai",
      "tag": "Study",
      "date": "2023-11-30T16:24:17.933Z",
      "__v": 0
    },
    {
      "_id": "6568d251d3f1ec2e86e4dfb0",
      "user": "65683dce2ffc79d2c7d40b8c",
      "title": "Mood off",
      "description": "Making react app , backend done",
      "tag": "Web dev",
      "date": "2023-11-30T18:20:01.275Z",
      "__v": 0
    }
  ]

  const [Notes, setNotes] = useState(NotesInitial);

  //add a note
  const getnotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify(),
    });
    const res = await response.json();
    //console.log(res);

    setNotes(res);

  }

  //add a note
  const addnote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();


    setNotes(Notes.concat(note));
  }

  //delete a node
  const deletenote = async(id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify(),
    });
    const res = response.json();
    console.log("note with id " + id + " is deleting");

    const newNotes = Notes.filter((Note) => { return Note._id !== id });
    setNotes(newNotes);
  }

  //edit a note
  const editnote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const res = await response.json();

    let newNotes = JSON.parse(JSON.stringify(Notes));
    for (let i = 0; i < newNotes.length; i++) {
      if (newNotes[i]._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
      }
    }

    setNotes(newNotes);
  }


  return (
    <>
      <NoteContext.Provider value={{ Notes, addnote, deletenote, editnote, getnotes }}>
        {props.children}
      </NoteContext.Provider>
    </>
  );
}

export default NoteState;
