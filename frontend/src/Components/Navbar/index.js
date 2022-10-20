import {BrowserRouter as Router,useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import React from 'react';
import { selectCurrentUserName } from '../../Api/Redux/authReducer';
import { logOut } from '../../Api/Redux/authReducer';
import Axios from '../../Api/axios';
import ScNavbar from './ScNavbar';

const Navbar = () => {
    const dispatch = useDispatch()
    const navigation = useNavigate();
    const location = useLocation();
    const userName = useSelector(selectCurrentUserName)

    const signOut = async () => {
        const from = location.state?.from?.pathname || "/";
        await Axios.get('/logout',{ withCredentials: true }).then(() =>{
            dispatch(logOut())
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
                <li onClick={""}>Load Image</li>
                <li onClick={""}>Settings</li>
            </ul>
            <div className='User-Section'>
                <p>{userName}</p>
                <button onClick={signOut}>LogOut</button>
            </div>
        </ScNavbar>
    );
}

Navbar.propTypes = {
};
  
Navbar.defaultProps = {
};
export default Navbar;