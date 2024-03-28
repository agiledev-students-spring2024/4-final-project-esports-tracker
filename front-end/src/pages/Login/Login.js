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
              <br /> Login <br /> <br />
              <input type="email" name="email" id="email" required />
              <br />
              <input type="password" name="password" id="password" required />
            </label>
            <br /><br />
            <input type="submit" value="Login" id="loginBtn" />
          </form>
        </div>
        <a href="/register">Register</a>
      </div>
    </>
  )
}

export default Login
