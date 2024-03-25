import React, {useState, useEffect} from 'react'
import './Card.css'
import axios from 'axios'
import { IoHeartOutline, IoChatbubbleEllipsesOutline, IoEllipsisHorizontalOutline} from "react-icons/io5";

const Card = (props) => {

    
  return (
    <>
    <div className="card" style = {{backgroundImage: `url(${props.url})`}}>
            <div className = 'cardOverlay'>
                <div className="cardInfo">
                    <h2>{props.name}</h2>
                    <p>Breed: {props.breed}</p>
                    <p>Age: {props.age}</p>
                    <p>Location: {props.location}</p>
                    <p>Description: {props.description}</p>
                </div>
            {/* `   <div className="cardButtons">
                        <IoHeartOutline/>
                        <IoChatbubbleEllipsesOutline/>
                        <IoEllipsisHorizontalOutline/>
                </div> */}
            </div>
        </div>
    </>
  )
}

export default Card