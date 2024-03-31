import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Profile.css'

const Profile = () => {

  const pfp= ['https://picsum.photos/id/237/200/300']
  const yourName = 'Tony_Gunk'
  const bio = 'This is a bio lorem ipsum blah blah I like to walk my dog and feed my dog. I also love cats but I lvoe dogs more. I live in NYC. '
  const [images, setImages] = useState([])
  const [error, setError] = useState('')



  const fetchImages = () => {
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
    fetchImages()
    const intervalHandle = setInterval(() => {
      fetchImages()
    }, 5000)
    return e => {
      clearInterval(intervalHandle)
    }
  }, []) 


  return (
    <>
      <div className='header'>
        <div className = 'profileHeader'>
            <img src={pfp} alt='avatar' />
            <div className='userName'>
              <h1>{yourName}</h1>
            </div>
        </div>
        <div className = 'bio'>
          <p>{bio}</p>
        </div>
      <Link to='/editProfile'>
      <button className='editProfileButton'> Edit Profile </button>
      </Link>
      <div className='profilePosts'>
      {
        images.map(image => (
            <div className='imageContainer'>
              <img key= {image.id} src={image.download_url} alt='image' />
            </div>
        ))
      }
      </div>
      </div>
      <div>

      </div>
      <form action="/logout?_method=DELETE" method="POST">
      <button type="submit"> Log Out </button>
        </form>
    </>
  )
}

export default Profile