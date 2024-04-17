import React from 'react';
// import classes from "../about.module.css"
const About = () => (
  <div style={{color:'black'}}>
    <u style={{marginBottom:'5px'}}><h3 style={{marginTop:'10px'}}>Welcome to Notes-Keeper</h3></u>
{/* <h1 className={classes.aboutSection}></h1> */}


    <section>
      <h3>Create Your Account:</h3>
      <ul>
        <li>Quick and secure registration process.</li>
        <li>Your personalized space for organized note-taking.</li>
      </ul>
    </section>

    <section>
      <h4>Login with Ease:</h4>
      <ul>
        <li>Access your account anytime with simple login credentials.</li>
        <li>Your dashboard is ready for your ideas.</li>
      </ul>
    </section>

    <section>
      <h4>Create, Read, Update, Delete Notes:</h4>
      <ul>
        <li>Effortlessly manage and customize your thoughts.</li>
        <li>Seamless navigation and real-time updates.</li>
        <li>Maintain a clutter-free workspace.</li>
      </ul>
    </section>

    <section>
      <h4>Security Matters:</h4>
      <ul>
        <li>Your data is stored securely with encryption measures.</li>
        <li>Password protection for an extra layer of security.</li>
      </ul>
    </section>

    <section>
      <h4>Join Today:</h4>
      <ul>
        <li>Experience the joy of organized thoughts.</li>
        <li>Elevate your productivity with Notes-Keeper – your personal haven of creativity.</li>
      </ul>
    </section>
  </div>
);

export default About;
