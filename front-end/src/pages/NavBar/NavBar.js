import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom';
import { IoChatbubble, IoSearchSharp, IoAddCircleSharp, IoPersonCircleOutline, IoArrowRedoOutline, IoPawOutline, IoGridOutline } from "react-icons/io5";


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



    </>
    )
  };

export default NavBar;
