//jshint esversion:6
import React from 'react';
import "./Footer.css";
import CopyrightIcon from '@material-ui/icons/Copyright';

function Footer() {

    // dynamic date used for project.
    let date = new Date();
    let yyyy = date.getFullYear();

    return (
        <div className="footer">
            {yyyy} <span>SanadTech</span> <CopyrightIcon style={{fontSize: "18px"}}/>
        </div>
    )
}

export default Footer;
