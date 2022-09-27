import {BrowserRouter as Router, Navigate ,Route, Link, useNavigate } from 'react-router-dom';
import  React,{useEffect, useState,useContext } from "react";
import AuthContext from "../../Context/AuthProvider";
import ScUserLogin from "./ScUserLogin";
import Axios from '../../Api/axios'
import WelcomePage from '../WelcomePage';

const UserLogin = () => {
    const { setAuth } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');    
    const [user_name, user_nameset] = useState();
    const [email, emailset] = useState();
    const [password, passwordset] = useState();
    const [userid_login, userid_loginset] = useState();
    const [password_login, password_loginset] = useState();

    useEffect(() => {
        const loginBtn = document.getElementById('login');
        const signupBtn = document.getElementById('signup');

        loginBtn.addEventListener('click', (e) => {
            let parent = e.target.parentNode.parentNode;
            Array.from(e.target.parentNode.parentNode.classList).find((element) => {
                if(element !== "slide-up") {
                    parent.classList.add('slide-up')
                }else{
                    signupBtn.parentNode.classList.add('slide-up')
                    parent.classList.remove('slide-up')
                }
            });
        });

        signupBtn.addEventListener('click', (e) => {
            let parent = e.target.parentNode;
            Array.from(e.target.parentNode.classList).find((element) => {
                if(element !== "slide-up") {
                    parent.classList.add('slide-up')
                }else{
                    loginBtn.parentNode.parentNode.classList.add('slide-up')
                    parent.classList.remove('slide-up')
                }
            });
        });
    },[]);

    const addUser = async () => { console.log(user_name,email,password)
        Axios.post('/signup',{
         user_name:  user_name,
         email:  email,
         password:  password,
        }).then=(() =>{ console.log("asdasdasudayhsydjk")
            alert("Succesfull Insert");
        });
    }

    const navigation = useNavigate();
    const userAuthorization = async () => { 
            try {
                const response = Axios.post('/login',{
                    user_name:  userid_login,
                    password:  password_login,
                    }).then((response) => {
                            response.data.message ? navigation("/UserLogin") : navigation("/Welcome");
                            console.log(response.data);
                    });
                const accessToken = response?.data?.accessToken;
                const roles = response?.data?.roles;
                console.log("response ",response, " ",accessToken, " ",roles)
                setAuth({roles, accessToken });
            } catch (error) {
                if (!error?.response) {
                    setErrMsg('No Server Response');
                } else if (error.response?.status === 409) {
                    setErrMsg('Username Taken');
                } else {
                    setErrMsg('Registration Failed')
                }
            }
    }
    
    return(
        <ScUserLogin /*login_background_image = {}*/>
            <div className='phone-background'>
                <div  className="form-structor">
                    <div  className="signup">
                        <h2  className="form-title" id="signup"><span>or</span>Sign up</h2>
                            <div  className="form-holder">
                                <input type="text"  className="input" name="user_name" required onChange={(e)=>{ user_nameset(e.target.value)}} placeholder="User Name" />
                                <input type="email"  className="input" name="email" required onChange={(e)=>{ emailset(e.target.value)}} placeholder="Email" />
                                <input type="password"  className="input" name="password" required onChange={(e)=>{ passwordset(e.target.value)}} placeholder="Password" />
                            </div>
                            <button  className="submit-btn" onClick={addUser}>Sign up</button>
                        
                    </div>
                    <div  className="login slide-up">
                        <div  className="center">
                                <h2  className="form-title" id="login"><span>or</span>Log in</h2>
                                <div  className="form-holder">
                                    <input type="text"  className="input" name="user_name" required onChange={(e)=>{ userid_loginset(e.target.value)}} placeholder="User Name" />
                                    <input type="password"  className="input" name="password" required onChange={(e)=>{ password_loginset(e.target.value)}} placeholder="Password" />
                                </div>
                                <button  className="submit-btn" onClick={userAuthorization}>Log in</button>
                        </div>
                    </div>
                </div>
            </div>
        </ScUserLogin>
    );
}

export default UserLogin;
