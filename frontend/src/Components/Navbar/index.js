import {useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import Axios from '../../Api/axios';
import ScNavbar from './ScNavbar';

const Navbar = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const userName = sessionStorage.getItem("user_name")

    const signOut = async () => {
        const from = location.state?.from?.pathname || "/";
        await Axios.get('/logout',{ withCredentials: true }).then(() =>{
            sessionStorage.clear();
            navigation(from, { replace: true })
        });
    }

    return (
        <ScNavbar>
            <ul>
                <li onClick={() => navigation("/Basket")}>My Basket</li>
                <li onClick={() => navigation("/ImageSet")}>Image Set</li>
                <li onClick={() => navigation("/Edit")}>Edit</li>
            </ul>
            <div className='User-Section'>
                <p>{userName}</p>
                <button onClick={signOut}>LogOut</button>
            </div>
        </ScNavbar>
    );
}
export default Navbar;