import React, {useRef, useState, useEffect, useContext} from 'react'
import AuthContext from '../../context/AuthProvider'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'



const Login = () => {
  const {setAuth} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"


  const userRef = useRef()
  const errRef = useRef()
  
  const [username, setUsername] = useState('')
  const [userFocus, setUserFocus] = useState(false)

  const [password, setPassword] = useState('')
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [errMessage, setErrorMessage] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])


  useEffect(()=>{
      setErrorMessage("")
  }, [username, password])

  const handleSubmit = async (e) =>{
      e.preventDefault();
      const ret = {
        user: username, password: password
      }

      console.log(ret)
      try{
          const response = await axios.post('http://localhost:3001/auth/login', ret)
          console.log(response.data)
          const accessToken = response?.data?.accessToken;
          const roles = response?.data.roles;
          setAuth({username, password, roles, accessToken})
          navigate(from, {replace:true})
          setPassword = ""
          setUsername = ''
        
      }
      catch(err){
          setErrorMessage(err)
          //error logic
          errRef.current.focus()
      }
  }
  
  return (
    <>

          <div>
        <div className='header'>Welcome to Pet Finder!</div>
        <p ref= {errRef} className={errMessage ? "errmsg" : "offscreen"} aria-live = "assertive">
          {errMessage.message}
        </p>
          <div className='register'>
            Login
            <form onSubmit={handleSubmit}>
              <label htmlFor='username'>
                Username:
              </label>
              <input type='text' id='username' ref={userRef} onChange={(e) => setUsername(e.target.value)}
              required autoComplete='off' onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              />
              <label htmlFor='password'>
                Password:
              </label>
              <input type='password' id='password' onChange={(e) => setPassword(e.target.value)}
              required onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              />
              <button disabled={username && password ? false: true}>
                Log in
              </button>
            </form>


            <div className='pathToLogin'>
              Create new account
              <Link to='/register' className="logLink">Register</Link>
            </div>
          </div>
          </div>
    </>
 )
}

export default Login