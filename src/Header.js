//jshint esversion:6
import { Avatar, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';
import { auth } from './firebase';
import "./Header.css";

function Header(props) {

    // handle user logout.
    const handleLogout = (e) => {
        auth.signOut();
    };
    return (
        <div className="header">
            <h5>Sanad Keeper</h5>
            <Avatar src={props.user && props.user.photo} alt="user" />
            <IconButton onClick={handleLogout}>
                <ExitToAppIcon style={{color: 'white'}}/>
            </IconButton>
        </div>
    )
}

export default Header;
