import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Profile.css'
import { IoSettingsOutline } from "react-icons/io5";
import useAuth from '../../hooks/useAuth';

const Profile = () => {

  const [profile, setProfile] = useState({
    username: '',
    bio: '',
    pfp: ''
  });
  const [images, setImages] = useState([])
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const {dispatch} = useAuth();
  const {user} = useAuth();  // 




  const fetchImages = () => { //TODO, MUST CHANGE THIS
    axios
      .get(`https://picsum.photos/v2/list`)
      .then(response => {
        const images = response.data
        setImages(images)
        console.log(images)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
  }

  useEffect(() => {
    if(user){
      axios
        .get('http://localhost:3001/profile/profile', 
        {headers:{
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
      fetchImages()
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
              <h1>{profile.username}</h1>
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
        <div className = 'bio'>
          <p>{profile.bio}</p>
        </div>

        <div className='profilePosts'>
        {
          images.map(image => (
              <div key={image.id} className='imageContainer'>
                <img src={image.download_url} alt='image' />
              </div>
          ))
        }
        </div>
      </div>
    </>
  )
}

export default Profile