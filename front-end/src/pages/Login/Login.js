import React, {useRef, useState, useEffect, useContext} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'
import AuthContext from '../../context/AuthProvider'
import welcomeImage from './welcome.png';




const Login = () => {
  const {dispatch} = useAuth()
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

          localStorage.setItem('user', JSON.stringify(response))
          const accessToken = response?.data?.token;
          const roles = response?.data.roles;
          dispatch({type: 'LOGIN', payload: response})
          navigate(from, {replace:true})
          setPassword = ''
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
        {/* <div className='header'>Welcome to Pet Finder!</div> */}
        <div className='header'>
          <img src={welcomeImage} alt="Welcome" style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }} />
        </div>
       
        <p ref= {errRef} className={errMessage ? "errmsg" : "offscreen"} aria-live = "assertive">
          {errMessage.message}
        </p>

        <div className="register_parent">

        <div className='register' style={{ width: '275px' }}> {/*register div start*/}
                    <h1>Login</h1>
                    {/* <div className='spacer'></div> */}
                    <form onSubmit={handleSubmit} className='registerForm'>
                      <label htmlFor='username'>
                        Username:
                        <div className='spacer'></div>
                      </label>
                      <input type='text' id='username' ref={userRef} onChange={(e) => setUsername(e.target.value)}
                      required autoComplete='off' onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      />
                      <label htmlFor='password'>
                      <div className='spacer'></div>
                        Password:
                        <div className='spacer'></div>
                      </label>
                      <input type='password' id='password' onChange={(e) => setPassword(e.target.value)}
                      required onFocus={() => setPasswordFocus(true)}
                      onBlur={() => setPasswordFocus(false)}
                      />
                       <div className='spacer'></div>
                      <button disabled={username && password ? false: true}>
                        Log in
                      </button>
                    </form>
                   


                   
                    <div className='pathToLogin'>
                      Create new account
                      <div className='spacer'></div>
                      <Link to='/register' className="logLink">Register</Link>
                    </div>
                  </div> {/* register div end*/}
                  <div className="background">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

        </div>



          </div>
    </>
 )
}

export default Login