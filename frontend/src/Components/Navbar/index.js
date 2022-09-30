import {BrowserRouter as Router, Navigate ,Route, Link, useNavigate, useLocation } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux'
import {prototype} from 'prop-types';
import { logOut } from '../../Api/Redux/authReducer';
import Axios from '../../Api/axios';
import ScNavbar from './ScNavbar';

const Navbar = ({onLoadJson}) => {
    const dispatch = useDispatch()
    const navigation = useNavigate();
    const location = useLocation();

    const signOut = async () => {
        const from = location.state?.from?.pathname || "/";
        await Axios.get('/logout',{ withCredentials: true }).then(() =>{
            dispatch(logOut())
            navigation(from, { replace: true })
        });
    }
    
    return (
        <ScNavbar>
            <ul>
                <li onClick={() => navigation("/Basket")}>My Basket</li>
                <li onClick={() => navigation("/ImageSet")}>Image Set</li>
                <li onClick={() => navigation("/Edit")}>Edit</li>
                <li onClick={onLoadJson}>Load Image</li>
                <li onClick={""}>Settings</li>
            </ul>
            <div className='User-Section'>
                <p>User Name</p>
                <button onClick={signOut}>LogOut</button>
            </div>
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