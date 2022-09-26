import {BrowserRouter as Router, Navigate ,Route, Link, useNavigate } from 'react-router-dom';
import  React,{useEffect, useState} from "react";
import ScUserLogin from "./ScUserLogin";
import Axios from "axios";
import WelcomePage from '../WelcomePage';

const UserLogin = () => {
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

    const [user_id, user_idset] = useState();
    const [email, emailset] = useState();
    const [password, passwordset] = useState();
    const [userid_login, userid_loginset] = useState();
    const [password_login, password_loginset] = useState();

    const addUser = () => { // addUser constant bir arrow function asagidaki button'un onClick eventi ile tetikleniyor
        Axios.post ("http://localhost:3001/user/post/add", { // Axios nodejs icin bir http client'i burada bu adrese verilen end point ile post req yapiyoruz.
         user_id:  user_id,
         email:  email,
         password:  password,
        }).then=(() =>{
            alert("Succesfull Insert");
        });
    }

    const navigation = useNavigate();
    const userAuthorization = () => { // userAuthorization constant bir arrow function asagidaki button'un onClick eventi ile tetikleniyor
            Axios.post ("http://localhost:3001/user/post/login", { // Axios nodejs icin bir http client'i burada bu adrese verilen end point ile post req yapiyoruz.
            user_id:  userid_login,
            password:  password_login,
                }).then((response) => {
                    response.data.message ? navigation("/UserLogin") : navigation("/WelcomePage");
                    console.log(response.data);
        });
    }

    /*
    useEffect(() => {
        Axios.get("http://localhost:3001/user/post/login").then((response) => {
            console.log("Diablo");
            if (response.data.loggedIn === true) {
                setLoginStatus(response.data.user[0].username);
            }
        });
    }, []);*/
    
    return(
        <ScUserLogin /*login_background_image = {}*/>
            <div className='phone-background'>
                <div  className="form-structor">
                    <div  className="signup">
                        <h2  className="form-title" id="signup"><span>or</span>Sign up</h2>
                        <form>
                            <div  className="form-holder">
                                <input type="text"  className="input" name="user_id" required onChange={(e)=>{ user_idset(e.target.value)}} placeholder="Kullanıcı Adı" />
                                <input type="email"  className="input" name="email" required onChange={(e)=>{ emailset(e.target.value)}} placeholder="Email" />
                                <input type="password"  className="input" name="password" required onChange={(e)=>{ passwordset(e.target.value)}} placeholder="Şifre" />
                            </div>
                            <button  className="submit-btn" onClick={addUser}>Sign up</button>
                        </form>
                    </div>
                    <div  className="login slide-up">
                        <div  className="center">
                                <h2  className="form-title" id="login"><span>or</span>Log in</h2>
                                <div  className="form-holder">
                                    <input type="text"  className="input" name="user_id" required onChange={(e)=>{ userid_loginset(e.target.value)}} placeholder="Kullanıcı Adı" />
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
