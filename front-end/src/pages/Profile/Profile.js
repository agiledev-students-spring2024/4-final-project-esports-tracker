import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Profile.css'
import { IoSettingsOutline } from "react-icons/io5";
import useAuth from '../../hooks/useAuth'; //IMPORTANT
import welcomeImage from './welcome.png';


const Profile = () => {

  const [profile, setProfile] = useState({
    username: '',
    bio: '',
    pfp: ''
  });
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const {dispatch} = useAuth();
  const {user} = useAuth();  //IMPORTANT




  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:3001/post/userPosts",
      {headers:{
        "Authorization": `Bearer ${user.data.token}`,
      }})
      if (!response.ok) {
        throw new Error("Failed to fetch posts")
      }
      const data = await response.json()
      setPosts(data.allPosts)
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }
  



  useEffect(() => {
    if(user){ 
      axios
        .get('http://localhost:3001/profile', 
        {headers:{ //IMPORTANT
          "Authorization": `Bearer ${user.data.token}`,

        }})
        .then(response => {
          setProfile({
            username: response.data.username,
            bio: response.data.bio,
            pfp: response.data.pfp
          });
        })
        .catch(error => {
          console.error("Error fetching profile:", error);
        });
      if(user){
      fetchImages()
      }
    }
  }, []) 


  const handleToggle = () => {
    setIsOpen(!isOpen);
  }
  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch({type: 'LOGOUT'})
  };


  return (
    <>
    
    <div className="top_header">
      <div className='header'>
      <img src={welcomeImage} alt="Welcome" style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%', margin: 'auto 0', position: 'absolute', position: 'absolute',  top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
    </div>


      <div className='profile'>
        <div className = 'profileHeader'>
            <img src={profile.pfp} alt='avatar' />
            <div className='userName'>
              {user && (
              <h1>{user.data.user}</h1> //GETTING USER CONTEXT
              )}
            </div>
            <IoSettingsOutline className='profileIcon' onClick={handleToggle}/>
            {isOpen && (
                <div className="dropdown-content">
                  <button onClick={handleLogout}>Logout</button>
                  <Link to='/editProfile'>
                    <button className='editProfileButton'> Edit Profile </button>
                  </Link>
                </div>
              )}
        </div>
        <div className="spacer"></div>
        
        <div className = 'bio'>
          <p>{profile.bio}</p>
        </div>
        <div className="spacer"></div><div className="spacer"></div>
        
        <div className='profilePosts'>
        {
          posts.map(post => (
              <div key={post._id} className='imageContainer'>
                <img src={post.image} alt='image' />
              </div>
          ))
        }
        </div>
      </div>
    </>
  )
}

export default Profile