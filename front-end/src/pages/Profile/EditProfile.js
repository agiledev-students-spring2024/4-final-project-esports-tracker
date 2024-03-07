import React, {useState} from 'react'
import './EditProfile.css'
import { IoChevronBack } from "react-icons/io5";
import { Link } from 'react-router-dom';



const EditProfile = () => {


    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');

    


    const handleSubmit = () => {
        //send the caption and image data to a server
        //do later
        window.location.href = '/Profile';
      };


  return (
    <>
    <div className='editHeader'>
        <Link to='/Profile'>
        <IoChevronBack size={30} />
        </Link>
        <h1>Edit Profile</h1>
      </div>
  <hr/>

<div className = "editInputs">
    <div className = 'editProfileImage'>
        <img src='https://picsum.photos/id/237/200/300' alt='profile' />
    </div>
    <div className = 'editProfileName'>
        <h2>Username</h2>
        <input type='text' placeholder="Username" name="username" />
    </div>
    <div className = 'editProfileBio'>
        <h2>Bio</h2>
        <input type='text' placeholder="Bio" name="bio" />
    </div>
    <div className = 'editProfileEmail'>
        <h2>Email</h2>
        <input type='text' placeholder="Email" name="email" />
    </div>
</div>

  <div className='addCaption'>
  </div>
  <button className = 'postSubmit' onClick={handleSubmit}>Save Changes</button>
  </>
  )
}

export default EditProfile