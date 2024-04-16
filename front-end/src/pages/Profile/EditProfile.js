import React, {useEffect, useState} from 'react'
import './EditProfile.css'
import { IoChevronBack } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';



const EditProfile = () => {

    const[pfp, setPfp] = useState('https://picsum.photos/id/237/200/300'); //default image
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [preference, setPreference] = useState('dog'); // State for selected preference
    const {user} = useAuth();  // 


    useEffect(() => {
        async function fetchData() {
        const req = await axios.get('http://localhost:3001/profile', 
        {headers:{
          "Authorization": `Bearer ${user.data.token}`,
        }})
        .then((response) => {
          setUsername(response.data.username);
          setBio(response.data.bio);
          setEmail(response.data.email);
          setPfp(response.data.pfp);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error)
        })}
        if(user){
        fetchData()
        }
      },[])
    
    const handleUser = (event) => {
        const inputValue = event.target.value;
        setUsername(inputValue);
      }
      const handleEmail = (event) => {
        const inputValue = event.target.value;
        setEmail(inputValue);
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
      const handleImage = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPfp(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
      const handlePreferenceChange = (event) => {
        setPreference(event.target.value);
      };


      const handleSubmit = (event) => {
        //send the caption and image data to a server
        const ret = {
          username: username,
          bio: bio,
          email: email,
          pfp: pfp,
          preferences: {// change this later
            breed: preference
          }
          
        }
        console.log(ret)
        axios.post('http://localhost:3001/profile/editProfile', ret)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Error handling out of frame data:', error)
        })
        alert('Changes saved');
        // window.location.href = '/Profile';
      };


  return (
    <>
    <div className='editHeader'>
        <Link to='/Profile'>
        <IoChevronBack size={30} />
        </Link>
        <h1>Edit Profile</h1>
      </div>


<div className = "editInputs">
    <div className="inputImage">
      {pfp && (
        <div>
          <img src={pfp} alt="Selected" style={{ maxWidth: '100%' }} />
        </div>
      )}
      <label htmlFor="file-input">Choose File</label>
      <input
        id="file-input"
        type="file"
        onChange={handleImage}
        accept="image/*"
      />
    </div>


    <div className = 'inputItem'>
        <h2>Username: </h2>
        <input type='text' placeholder="Username" name="username" value={username} className="textBoxStyling" onChange={handleUser}/>
    </div>
    <div className = 'inputItem'>
        <h2>Bio: </h2>
        <textarea type='text' placeholder="Bio" value={bio} name="bio" className="textBoxStyling" onChange={handleBio}/>
    </div>
    <div className = 'inputItem'>
        <h2>Email: </h2>
        <input type='text' placeholder="Email" value={email} name="email" className="textBoxStyling" onChange={handleEmail} />
    </div>
    <div className = 'inputItem'> 
    {/* TODO: Add a dropdown menu for preferences integrated with backend */}
        <h2>Preferences: </h2>
        <select name="preferences" className="pet_pref" id="preferences">
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Other">Other</option>
            <option value="Any">Any</option>
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