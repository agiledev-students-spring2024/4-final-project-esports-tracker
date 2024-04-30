import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Profile.css'
import { IoSettingsOutline } from "react-icons/io5";
import useAuth from '../../hooks/useAuth'; //IMPORTANT
const BASE_URL = process.env.REACT_APP_API_BASE_URL

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
      const response = await fetch(`${BASE_URL}/post/userPosts`,
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
        .get(`${BASE_URL}/profile/`, 
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