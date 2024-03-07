import React, {useState} from 'react'
import './Add.css'
import { IoChevronBack, IoChevronDown, IoLocationOutline } from "react-icons/io5";
import { FiTag } from "react-icons/fi";

const Add = () => {
  const image= ['https://picsum.photos/id/237/200/300']
  const [caption, setCaption] = useState('');
  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 140) {
      setCaption(inputValue);
    }
    else {
      alert('Caption is too long');
    }
  };

  const handleSubmit = () => {
    //send the caption and image data to a server
    console.log(caption);
    setCaption('');
    //do later
  };


  

  return (
    <>
      <div className='addHeader'>
          <IoChevronBack size={30} />
          <h1>New Post</h1>
        </div>
    <hr/>
      <div className='addImage'>
        <img src={image} alt='post' />
      </div>
    <hr/>
    <div className = 'chooseImage'>
      Camera Roll
      <IoChevronDown size={30} />
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
    </div>
    <hr/>
    <button className = 'postSubmit' onClick={handleSubmit}>Share</button>
    </>
 )
}

export default Add