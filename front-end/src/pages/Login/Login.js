import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'


const handleLogin = async(e) => {
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
      console.log('You have succesfully logged in!');
    }
    else {
      console.log('ERROR: Unable to login. Invalid credentials.');
    }
  }
  catch (error) {
    console.error('ERROR: Unable to login. Invalid credentials.', error); 
  }
}


const Login = () => {
  return (
    <>
      <h1>Welcome to Pet Finder!</h1>
      <div className="parent">
        <div className='login'>
          <form action="/login" method="POST">
            <label>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
              <br /> Login <br /> <br />
              
              <input type="email" name="email" className="email" placeholder="Email" required />
              
              <br />
              <div className="spacer"></div>
              
              <input type="password" name="password" className="password" placeholder="Password" required />
            </label>
            <br /><br />
            {/* when user submits to login */}
            <form onSubmit={handleLogin}>
              <input type="submit" value="Login" className="loginBtn" />
            </form>
            
          </form>
          <div className="spacer"></div>
          
          {/* if user wants to navigate to register page*/}
          <form action="/register" method="POST">
            <Link to='/register' className="regLink">Register</Link>
          </form>

        </div>
        
      </div>
    </>
  )
};

export default Login
