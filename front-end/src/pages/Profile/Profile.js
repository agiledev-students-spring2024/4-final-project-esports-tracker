import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    bio: '',
    pfp: ''
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  // Fetch profile data from the server
  useEffect(() => {
    axios.get('/profile')
      .then(response => {
        setProfile({
          username: response.data.username,
          bio: response.data.bio,
          pfp: response.data.pfp
        });
      })
      .catch(err => {
        setError('Failed to load profile.');
      });

    const fetchImages = () => {
      axios.get(`https://picsum.photos/v2/list`)
        .then(response => {
          setImages(response.data);
        })
        .catch(err => {
          setError('Failed to load images.');
        });
    };

    fetchImages();
    const intervalHandle = setInterval(fetchImages, 5000);

    return () => clearInterval(intervalHandle);
  }, []);

  return (
    <>
      <div className='header'>
        <div className='profileHeader'>
          <img src={profile.pfp} alt='avatar' />
          <div className='userName'>
            <h1>{profile.username}</h1>
          </div>
        </div>
        <div className='bio'>
          <p>{profile.bio}</p>
        </div>
        <Link to='/editProfile'>
          <button className='editProfileButton'> Edit Profile </button>
        </Link>
        <div className='profilePosts'>
          {images.map(image => (
            <div className='imageContainer' key={image.id}>
              <img src={image.download_url} alt='image' />
            </div>
          ))}
        </div>
      </div>
      <form action="/logout?_method=DELETE" method="POST">
      <button type="submit"> Log Out </button>
        </form>
    </>
  );
};

export default Profile;
