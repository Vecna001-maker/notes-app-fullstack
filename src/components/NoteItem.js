import React, { useContext } from 'react'
// import Alert from './Alert';
import NoteContext from '../context/notes/NoteContext';

export default function NoteItem(props) {
    const {note,updateNote} = props;
    const {deletenote} = useContext(NoteContext);

    const {alert,showAlert} = props;

    
    // const viewnote = () =>{
       
    // }

    const handleClick = ()=>{
        deletenote(note._id);
        showAlert("success","Your selected note successfully deleted");
    }
    return (
        <>
           <div className='col-md-3'>
            <div className="card border border-5" style={{width : "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={handleClick}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    {/* <i class="fa-solid fa-eye"></i> */}
                    {/* <a href='/' className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
          </div>
        </>
    )
}
