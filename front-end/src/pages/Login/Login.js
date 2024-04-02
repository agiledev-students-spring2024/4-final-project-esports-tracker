import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'


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
            <input type="submit" value="Login" className="loginBtn" />
            
          </form>
          <div className="spacer"></div>
          <Link to='/register' className="regLink">Register</Link>
        </div>
        
      </div>
    </>
  )
}

export default Login
