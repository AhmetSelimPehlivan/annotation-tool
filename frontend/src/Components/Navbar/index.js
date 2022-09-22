import React, {useState, useEffect} from 'react';
import {prototype} from 'prop-types';
import ScNavbar from './ScNavbar';
const Navbar = ({onLoadJson}) => {
    const fileSelectedHandler = event =>{
        
    }
    return (
        <ScNavbar>
            <ul>
                <li onClick={""}>Project</li>
                <li onClick={""}>Save</li>
                <li onClick={""}>Import</li>
                <li onClick={""}>Export</li>
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