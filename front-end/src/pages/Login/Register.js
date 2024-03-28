import React from 'react'
import './Register.css'

const Register = () => {
  return (
    <>

    <h1>Welcome to Pet Finder!</h1>

    <div className="parent">

          <div className='register'>
            <form action="/register" method="POST">
              <label>
              <br /> Register <br /> <br />
                
                <input type="email" name="email" id="email" required/>
                <br />
                <input type="password" name="password" id="password" required/>
              </label>
              <br /><br />
              <input type="submit" value="Register" id="registerBtn"/>
            </form>
          </div>
          <a href="/login">Login</a>

    </div>
   

    </>
 )
}

export default Register