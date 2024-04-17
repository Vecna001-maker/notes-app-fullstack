import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Navbar() {

  //jis bhi route pe rhenge uski location dega ye
  //location.pathname se exact path mil jayega
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location);
  }, [location]);

  const logingout = ()=>{
    localStorage.clear();
    navigate('/login');
  }

  return (
    <>
      <nav style={{backgroundColor:'black',display:'flex',alignItems:'center',justifyContent:'center'}} className="navbar navbar-expand-lg navbar-dark">
        <div style={{backgroundColor:'black'}} className="container-fluid">
          <h2 style={{backgroundColor:'black'}} className="navbar-brand" to="/">
            iNotebook
          </h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div style={{backgroundColor:'black'}} className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {localStorage.getItem('token') !== null?
              <li className="nav-item">
                <Link
                  style={{backgroundColor:'black'}}
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              :
              ""
             }
              <li className="nav-item">
                <Link
                  style={{backgroundColor:'black'}}
                  className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {localStorage.getItem('token') === null?
            <>
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
            </>
            :
            <button className="btn btn-primary mx-2"  role="button" onClick={logingout}>Logout</button>
             }
  
          </div>
        </div>
      </nav>
    </>
  );
}
