import React from 'react'
import './Login.css'

const Login = ({ messages }) => {
  return (
    <>
      {messages?.error && (
        <div className="error-message">
          {messages.error}
        </div>
      )}

      <h1>Welcome to Pet Finder!</h1>

      <div className="parent">
        <div className='login'>
          <form action="/login" method="POST">
            <label>
            <div class="spacer"></div>
            <div class="spacer"></div>
            <div class="spacer"></div>
              <br /> Login <br /> <br />
              
              <input type="email" name="email" id="email" placeholder="Email" required />
              
              <br />
              <div class="spacer"></div>
              
              <input type="password" name="password" id="password" placeholder="Password" required />
            </label>
            <br /><br />
            <input type="submit" value="Login" id="loginBtn" />
            
          </form>
          <div class="spacer"></div>
          <a href="/register" id="regLink">Register</a>
        </div>
        
      </div>
    </>
  )
}

export default Login
