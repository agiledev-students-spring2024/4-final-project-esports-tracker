import React, {useState} from 'react'
import './EditProfile.css'
import { IoChevronBack } from "react-icons/io5";
import { Link } from 'react-router-dom';



const EditProfile = () => {


    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');

    
    const handleUser = (event) => {
        const inputValue = event.target.value;
        setUsername(inputValue);
      }
      const handleBio = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 140) {
          setBio(inputValue);
        }
        else {
          alert('Bio is too long');
        }
      };

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
    <div className = 'inputImage'>
        <img src='https://picsum.photos/id/237/200/300' alt='profile' />
    </div>
    <div className = 'inputItem'>
        <h2>Username: </h2>
        <input type='text' placeholder="Username" name="username" onChange={handleUser}/>
    </div>
    <div className = 'inputItem'>
        <h2>Bio: </h2>
        <textarea type='text' placeholder="Bio" name="bio" onChange={handleBio}/>
    </div>
    <div className = 'inputItem'>
        <h2>Email: </h2>
        <input type='text' placeholder="Email" name="email" />
    </div>
    <div className = 'inputItem'>
        <h2>Preferences: </h2>
        <select name="preferences" id="preferences">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </select>
    </div>

</div>

  <div className='addCaption'>
  </div>
  <button className = 'postSubmit' onClick={handleSubmit}>Save Changes</button>
  </>
  )
}

export default EditProfile