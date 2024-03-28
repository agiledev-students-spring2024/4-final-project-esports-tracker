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
              <div class="spacer"></div>
              <div class="spacer"></div>
              <div class="spacer"></div>
              <br /> Register <br /> <br />
                
                <input type="email" name="email" id="email" placeholder="Email" required/>
                <br />
                <div class="spacer"></div>
                <input type="password" name="password" id="password" placeholder="Password" required/>
              </label>
              <br /><br />
              <input type="submit" value="Register" id="registerBtn"/>
            </form>
            <div class="spacer"></div>
            <a href="/login" id='logLink'>Login</a>
          </div>
          

    </div>
   

    </>
 )
}

export default Register