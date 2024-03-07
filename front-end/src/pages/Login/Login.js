import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <>

    <h1>Welcome to Pet Finder!</h1>

    <div className="parent">

          <div className='login'>
            <form>
              <label>
              <br /> Login <br /> <br />
                
                <input type="text" name="username" value="username" id="account"/>
                <br />
                <input type="text" name="password" value="password" id="account"/>
              </label>
              <br /><br />
              <input type="submit" value="Login" id="loginBtn"/>
            </form>
          </div>

          <div className='spacer'></div>

          <div className='register'>
            <form>
              <label>
              <br /> Register <br /> <br />
                <input type="text" name="username" value="username" id="account"/>
                <br />
                <input type="text" name="password" value="password" id="account"/>
              </label>
              <br /> <br />
              <input type="submit" value="Register" id="loginBtn"/>
            </form>
          </div>
    </div>


    </>
 )
}

export default Login