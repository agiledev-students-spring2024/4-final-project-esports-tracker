import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom';
import { IoChatbubble, IoSearchSharp, IoAddCircleSharp, IoPersonCircleOutline, IoArrowRedoOutline, IoPawOutline, IoGridOutline } from "react-icons/io5";
import welcomeImage from './welcome.png';

const NavBar = () => {
    return (
    <>

        <div className="navbar">
            <Link to="/swipe">
            <div className="navItem">
                <IoPawOutline className = 'icon' />
                Swipe
            </div>
            </Link>
            <Link to="/feed">
            <div className="navItem">
                <IoGridOutline className = 'icon' />
                Discover
            </div>
            </Link>
            <Link to="/add">
            <div className="navItem">
                <IoAddCircleSharp className = 'icon' />
                Add
            </div>
            </Link>
            <Link to="/message">
            <div className="navItem">
                <IoChatbubble className='icon'/>
                Message
            </div>
            </Link>
            <Link to="/profile">
            <div className="navItem">
                <IoPersonCircleOutline className = 'icon' />
                Profile
            </div>
            </Link>

        </div>


        <div className="top_header">
            <div className='header'>
            <img src={welcomeImage} alt="Welcome" style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '35%', textAlign: 'center' }} />
            </div>
            {/* <Link to="/swipe">

            </Link>
            <Link to="/feed">

            </Link>
            <Link to="/add">

            </Link>
            <Link to="/message">

            </Link>
            <Link to="/profile">

            </Link> */}

        </div>
    </>
    )
  };

export default NavBar;
