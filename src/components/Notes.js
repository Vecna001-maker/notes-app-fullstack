import React from 'react';
import { useContext, useEffect, useRef,useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


export default function Notes(props) {

  const navigate = useNavigate();

  const { Notes, getnotes,editnote } = useContext(NoteContext);
  useEffect(() => {
    if(localStorage.getItem('token')){
      getnotes();
    }
    else{
      navigate('/login');
    }
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null)
  const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""});

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }

  
  const handleChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  }

  const handleClick = (e) => {
    refClose.current.click();
    editnote(note.id,note.etitle,note.edescription,note.etag);
    console.log("updating the note..",note);
    e.preventDefault();
    setnote({id:"",etitle:"",edescription:"",etag:""});

    showAlert("success","Your note is Edited and saved");
  }

  const {alert,setalert,showAlert} = props;

  return (
    <>
      <AddNote setalert={setalert} alert={alert} showAlert={showAlert} />

      <button type="button" className="btn btn-primary" style={{ display: 'none' }} ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"><h3 style={{textDecorationColor:'black', borderColor:'black'}}>Edit Note</h3></h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" value={note.edescription} className="form-control" id="edescription" name='edescription' onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" value={note.etag} className="form-control" id="etag" name="etag" onChange={handleChange} />
                </div>
               
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <h1>Your Notes Are:</h1>




      <div className='row my-3'>
        <div className='container mx-2'>
        {Notes.length === 0 && "No notes to display"}
        </div>
        
        {Notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} alert={alert} showAlert={showAlert} />
        })}

      </div>

    </>
  )
}
