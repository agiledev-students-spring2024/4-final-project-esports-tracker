import React, {useState, useEffect} from 'react'
import './Card.css'
import axios from 'axios'
import { IoHeartOutline, IoChatbubbleEllipsesOutline, IoEllipsisHorizontalOutline} from "react-icons/io5";

const Card = () => {

    
    const image = 'https://picsum.photos/200/300'

  return (
    <>
    <div className="card" style = {{backgroundImage: `url(${image})`}}>
            <div className = 'cardOverlay'>
                <div className="cardInfo">
                    <h2>Pet Name</h2>    
                    <h4>Breed</h4>        
                    <h4>Age/Weight</h4>
                    <h4>Location</h4>
                    <h4>Description</h4>
                </div>
            `   <div className="cardButtons">
                        <IoHeartOutline/>
                        <IoChatbubbleEllipsesOutline/>
                        <IoEllipsisHorizontalOutline/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Card