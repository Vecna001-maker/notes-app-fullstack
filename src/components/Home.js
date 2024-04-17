import React from 'react';
import Notes from './Notes';
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function Home(props) { 
 const {alert,setalert,showAlert} = props;
  return (
    <>
      <Notes setalert={setalert} alert={alert} showAlert={showAlert} />
    </>
  )
}
