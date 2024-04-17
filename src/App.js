
import './App.css';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import {useState} from 'react'


import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';

function App() {

  const [alert, setalert] = useState(null);

  const showAlert = (type,message) =>{
      setalert({type:type,message:message});
      setTimeout(() => {
        setalert(null);
      }, 1500);
  }
  return (
    <>
      <NoteState>


        <Router>
          <Navbar />

           {alert !== null ? <Alert alert={alert} />: ""}

          

          <div className='container'>
            <Routes>
              <Route exact path='/' element={<Home setalert={setalert} alert={alert} showAlert={showAlert} />} />
              <Route exact path='/about' element={<About setalert={setalert} alert={alert} showAlert={showAlert} />} />
              <Route exact path='/login' element={<Login setalert={setalert} alert={alert} showAlert={showAlert}/>} />
              <Route exact path='/signup' element={<Signup setalert={setalert} alert={alert} showAlert={showAlert}/>} />
            </Routes>
          </div>



        </Router>
      </NoteState>
    </>

  );
}

export default App;
