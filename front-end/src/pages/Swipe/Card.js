import React, {useState, useEffect} from 'react'
import './Card.css'
import axios from 'axios'
import { IoHeartOutline, IoEllipsisHorizontalOutline} from "react-icons/io5";
import { FaRegThumbsDown } from "react-icons/fa6";

const Card = (props) => {
  const handleSwipe = (dir) => {
    try {
      props.swipe(dir);
    } catch (error) {
      console.error('Error while swiping:', error);
    }
  };

  return (
    <>


    <div className="card" style = {{backgroundImage: `url(${props.url})`}}>
            <div className = 'cardOverlay'>
                <div className="cardInfo">
                    <h2>{props.name}</h2>
                    <p><b>Breed: </b>{props.breed}</p>
                    <p><b>Age: </b>{props.age}</p>
                    <p><b>Location: </b>{props.location}</p>
                    <p><b>Description: </b>{props.description}</p>
                </div>
            `   <div className="cardButtons">
                    
                        <IoHeartOutline onClick={() => handleSwipe('right')} onTouchEnd={() => handleSwipe('right')}/>
                        <FaRegThumbsDown onClick={() => handleSwipe('left')} onTouchEnd={() => handleSwipe('left')}/>
                        <IoEllipsisHorizontalOutline/>
                </div>
            </div>
        </div>

        

{/* 
        <div className="swipe_background">
      </div> */}
       
      
      
    </>
  )
}

export default Card