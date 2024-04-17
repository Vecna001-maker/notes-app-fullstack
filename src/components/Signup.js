import React from 'react'
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const navigate = useNavigate();

  const [credentials, setcredentials] = useState({name:"",email:"",password:""});

  const {alert,setalert,showAlert} = props;

  const handleChange = (e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name:credentials.name,email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    console.log(json);

    if(json.success === true){
      navigate('/');
      showAlert("success","User successfully registered");
    }
    else{
      showAlert("warning","Email already registered");
    }

    setcredentials({name:"",email:"",password:""})

    
  }
  return (
    <> 
    <h2 className='my-5'>Create new Account</h2>
      <form className='my-3' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Username</label>
          <input onChange={handleChange} value={credentials.name} type="text" className="form-control" name='name' id="name" minLength={3} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input onChange={handleChange} value={credentials.email} type="email" name='email' className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={handleChange} value={credentials.password} type="password" name='password' className="form-control" id="password" minLength={5} required/>
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </>
  )
}

export default Signup