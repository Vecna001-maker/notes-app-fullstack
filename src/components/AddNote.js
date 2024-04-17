import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function AddNote(props) {

    const {alert,setalert,showAlert} = props;

    const [note, setnote] = useState({title:"",description:"",tag:""});
    const {addnote} = useContext(NoteContext);

    const handleChange = (e) =>{
        setnote({...note,[e.target.name] : e.target.value});
    }

    const handleClick = (e)=>{
        e.preventDefault();
        addnote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:""});
       // setalert({type:"success",message:"Note successfully added"});
        showAlert("success","Note successfully added");     
    }
  return (
    <>
    <h1  className='my-3 mt-5'>Add Your Note</h1>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input value={note.title} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input value={note.description} type="text" className="form-control" id="description" name='description' onChange={handleChange}  />
        </div>
        <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
          <input value={note.tag} type="text" className="form-control" id="tag" name="tag" onChange={handleChange} />
        </div>
        <button disabled={note.title.length < 5 || note.description.length <5} type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
      </form>
      </>
  )
}
