import React from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

const handleRegistration = async(e) => {
  e.preventDefault();
  const email = e.target.email.value; 
  const password = e.target.password.value; 

  try {
    const response = await fetch ('/register', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    if (response.ok){
      console.log('You have succesfully registered!');
    }
    else if (response.ststus == 409) {
      console.log('ERROR: A user already exists under that email.');
    }
    else {
      console.log('ERROR: Unable to login. Invalid credentials.');
    }
  }
  catch (error) {
    console.error('ERROR: Unable to login. Invalid credentials.', error); 
  }
}

const Register = () => {
  return (
    <>

        <h1>Welcome to Pet Finder!</h1>

        <div className="parent">
          <div className='register'>
            <form action="/register" method="POST">
              <label>
              <div className="spacer"></div>
              <div className="spacer"></div>
              <div className="spacer"></div>
              <br /> Register <br /> <br />
                
                <input type="email" name="email" className="email" placeholder="Email" required/>
                <br />
                <div className="spacer"></div>
                <input type="password" name="password" className="password" placeholder="Password" required/>
              </label>
              <br /><br />
              {/* when user submits registration */}
              <form onSubmit={handleRegistration}>
                <input type="submit" value="Register" className="registerBtn" />
              </form>
            </form>
            <div className="spacer"></div>

            {/* if user wants to navigate to login page*/}
            <form action="/login" method="POST">
              <Link to='/login' className="logLink">Login</Link>
            </form>
          </div>
    </div>
    </>
 )
}

export default Register