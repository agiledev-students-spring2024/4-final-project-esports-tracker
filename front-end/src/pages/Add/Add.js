import React, {useState} from 'react'
import './Add.css'
import axios from 'axios';
import { IoChevronBack, IoChevronDown, IoLocationOutline } from "react-icons/io5";
import { FiTag } from "react-icons/fi";
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';



const Add = () => {
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const {user} = useAuth();  // 


  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 140) {
      setCaption(inputValue);
    }
    else {
      alert('Caption is too long');
    }
  };


  const handleSubmit = (event) => {
    //send the caption and image data to a server
    const ret = {
      caption: caption,
      image: selectedImage
    }
 
    if (!selectedImage || !caption ) {
      alert('Please select an image or write a caption before submitting.');
      return;
    }
    console.log(ret)
    if(user){
      axios.post('http://localhost:3001/post', ret, 
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
    setCaption('');
    setSelectedImage(null);
    alert('Post submitted');

  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  

  return (
    <>
      <div className='addHeader'>
          <Link to='/discover'>
          <IoChevronBack size={30} />
          </Link>
          <h1>New Post</h1>
        </div>
    <hr/>
      <div className='addImage'>
            {selectedImage && (
            <div>
              <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
            </div>
          )}
      </div>
    <hr/>
    <div className = 'chooseImage'>
      <input type='file' onChange={handleImage} accept='image/*' />
    </div>
    <hr/>


    <div className='addCaption'>
      <textarea type='text' placeholder="Write a caption..." name="caption" 
      value={caption}
      onChange={handleChange}
      />
    </div>


    <hr/>
    <div className='addTags'>
      <FiTag size={30} />
      Tag People
    </div>
    <hr/>
   <div className='addLocation'>
    <IoLocationOutline size={30} />
      Add Location 
      {/* google api autocomplete */}
    </div>
    <hr/>
    <button className = 'postSubmit' onClick={handleSubmit}>Share</button>
    </>
 )
}

export default Add