import React, {useEffect, useState} from 'react'
import './EditProfile.css'
import { IoChevronBack } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';



const EditProfile = () => {
    const [selectedImage, setSelectedImage] = useState(null)
    const [imageFile, setImageFile] = useState('https://picsum.photos/id/237/200/300')
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [preference, setPreference] = useState('dog'); // State for selected preference
    const {user} = useAuth();  // 


    useEffect(() => {
        async function fetchData() {
        const req = await axios.get('http://localhost:3001/profile/getEditProfile', 
        {headers:{
          "Authorization": `Bearer ${user.data.token}`,
        }})
        .then((response) => {
          setUsername(response.data.username);
          setBio(response.data.bio);
          setEmail(response.data.email);
          setSelectedImage(response.data.pfp)
          setPreference(response.data.preferences)
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

      const handlePreferenceChange = (event) => {
        setPreference(event.target.value);
      };


      const handleSubmit = async (e) => {
        //send the caption and image data to a server
        const formData = new FormData()
        formData.append('image', imageFile)
        formData.append('username', username)
        formData.append('bio', bio)
        formData.append('email', email)
        formData.append('preferences', preference)

        
        if(user){
          await axios.post('http://localhost:3001/profile/postEditProfile', formData, 
          {headers:{
            "Authorization": `Bearer ${user.data.token}`,
          }})
          .then((response) => {
            console.log(response.data)
          })
          .catch((error) => {
            console.error('Error handling out of frame data:', error)
          })
        }
        alert('Changes Saved');

        // window.location.href = '/Profile';
      };


      const handleImage = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImage(reader.result);
            setImageFile(file)
          };
          reader.readAsDataURL(file);
        }
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
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
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
        <select name="preferences" className="pet_pref" id="preferences" defaultValue={preference}>
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