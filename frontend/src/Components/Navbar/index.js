import {BrowserRouter as Router, Navigate ,Route, Link, useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import {prototype} from 'prop-types';
import ScNavbar from './ScNavbar';
const Navbar = ({onLoadJson}) => {
    const navigation = useNavigate();
    const fileSelectedHandler = event =>{
        
    }
    
    return (
        <ScNavbar>
            <ul>
                <li onClick={() => navigation("/Basket")}>My Basket</li>
                <li onClick={() => navigation("/ImageSet")}>Image Set</li>
                <li onClick={() => navigation("/")}>Edit</li>
                <li onClick={onLoadJson}>Load Image</li>
                <li onClick={""}>Settings</li>
            </ul>
        </ScNavbar>
    );
}

Navbar.propTypes = {
    onLoadJson: prototype
};
  
Navbar.defaultProps = {
    onLoadJson: f => f
};
export default Navbar;