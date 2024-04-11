import React, {useRef, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import axios from 'axios'



const Register = () => {
  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&]).{8,24}$/;

  const userRef = useRef();
  const errRef = useRef();
  
  const [username, setUsername] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)
  
  const [matchPassword, setMatchPassword] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMessage, setErrorMessage] = useState('')
  const[success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(username)
    console.log(result, username)
    setValidName(result)
  }, [username])

  useEffect(() => {
    const result = PASS_REGEX.test(password)
    console.log(result, password)
    setValidPassword(result)
    const match = password === matchPassword
    setValidMatch(match)
  }, [password, matchPassword])

  useEffect(()=>{
      setErrorMessage("")
  }, [username, password, matchPassword])

  const handleSubmit = async (e) =>{
      e.preventDefault();
      const ret = {
        user: username, password: password
      }
      console.log(ret)
      try{
          const response = await axios.post('http://localhost:3001/auth/register', ret)

          console.log(response.data)
          setSuccess(true)
          setPassword = ""
          setUsername = ''
          setMatchPassword = ''
        
      }
      catch(err){
          setErrorMessage(err)
          //error logic
          errRef.current.focus()
      }
  }
  
  return (
    <>
        {success ? (
          <div className = 'success'>
              <h1>Success!</h1>
              <Link to='/login' className="logLink"> Login </Link>
          </div>
        ) : (
          <div>
        <div className='header'>Welcome to Pet Finder!</div>
        <p ref= {errRef} className={errMessage ? "errmsg" : "offscreen"} aria-live = "assertive">
          {errMessage.message}
        </p>
          <div className='register'>
            Register
            <form onSubmit={handleSubmit}>
              <label htmlFor='username'>
                Username:
              </label>
              <input type='text' id='username' ref={userRef} onChange={(e) => setUsername(e.target.value)}
              required autoComplete='off' aria-invalid={validName ? 'false' : 'true'} aria-describedby='uidnote'
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              />
              <p id='uidNote' className={userFocus && username && !validName ? 'instructions' : 'offscreen'}>
                4 to 24 letters, can only contain a-zA-Z, -, _, 0-9, must start with letter
              </p>
              <label htmlFor='password'>
                Password:
              </label>
              <input type='password' id='password' onChange={(e) => setPassword(e.target.value)}
              required aria-invalid={validPassword ? 'false' : 'true'} aria-describedby='pwdnote'
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              />
              <p id='pwdnote' className={passwordFocus && password && !validPassword ? 'instructions' : 'offscreen'}>
                8-24 characters, must include 1 uppercase, 1 lowercase, 1 number, and 1 special character
              </p>
              <label htmlFor='confirmPassword'>
                Confirm Password:
              </label>
              <input type='password' id='confirmPassword' onChange={(e) => setMatchPassword(e.target.value)}
              required aria-invalid={validMatch ? 'false' : 'true'} aria-describedby='matchnote'
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              />
              <p id='matchNote' className={matchFocus && matchPassword && !validMatch ? 'instructions' : 'offscreen'}>
                2 passwords must match!
              </p>

              <button disabled={validMatch && validName && validPassword ? false: true}>
                Sign up
              </button>
            </form>


            {/* if user wants to navigate to login page*/}
            <div className='pathToLogin'>
              Already registered?
              <Link to='/login' className="logLink">Login</Link>
            </div>
          </div>
          </div>
        )}
    </>
 )
}

export default Register