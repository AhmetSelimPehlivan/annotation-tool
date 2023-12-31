import {useNavigate, useLocation } from 'react-router-dom';
import  React,{useEffect, useState} from "react";
import { emailValidator, passwordValidator } from '../../Constants';
import ScUserLogin from "./ScUserLogin";
import Axios from '../../Api/axios';

const UserLogin = () => {
    const navigation = useNavigate();
    const [isCreated, setIsCreated] = useState(false)
    const [save_msg, setsave_msg] = useState("")
    const [wrongLogin, setwrongLogin] = useState("")
    const [user_name, user_nameset] = useState();
    const [email, emailset] = useState();
    const [role, setRole] = useState();
    const [password, passwordset] = useState();
    const [userid_login, userid_loginset] = useState();
    const [password_login, password_loginset] = useState();    
    const location = useLocation();
    const from = location.state?.from?.pathname || "/ImageSet";
    
    useEffect(() => {
        if(sessionStorage.getItem("user_name") === "User")
            navigation(from, { replace: true })
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
    });

    const addUser = async () => {
        try {
            if(!emailValidator.test(email)){
                setIsCreated(false)
                setsave_msg("Email is not valid")
            }
            else if(!passwordValidator.test(password)){
                setIsCreated(false)
                setsave_msg("Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!")
            }
            else{
                await Axios.post('/signup',{
                    user_name:  user_name,
                    email:  email,
                    role: role,
                    password:  password,
                    }, { withCredentials: true }).then((response) =>{
                        setsave_msg(response.data.message)
                        setIsCreated(true)
                    });
            }
        } catch (error) {
            setsave_msg(error.response.data.message)
        }
    }

    const userAuthorization = async () => {
        try {
            await Axios.post('/login',{
                user_name:  userid_login,
                password:  password_login
                }, { withCredentials: true }).then(async (response) => {
                    sessionStorage.setItem("user_name", response.data.user_name)
                    sessionStorage.setItem("role", response.data.role)

                    response.status === 200 ? navigation(from, { replace: true }): setwrongLogin(response.data.message);  
                });
        } catch (error) {
            setwrongLogin(error.response.data.message)
        }
    }
    
    return(
        <ScUserLogin isCreated={isCreated}>
            <div className='phone-background'>
                <div  className="form-structor">
                    <div  className="signup">
                        <h2  className="form-title" id="signup"><span>or</span>Sign up</h2>
                            <form  className="form-holder">
                                <input type="text" className="input" name="user_name" minLength="3" maxLength="20" required onChange={(e)=>{ user_nameset(e.target.value)}} placeholder="User Name" />
                                <input type="email" className="input" name="email" required onChange={(e)=>{ emailset(e.target.value)}} placeholder="Email" />
                                <select onChange={(e) => setRole(e.target.value)} required >
                                    <option value="User">User</option>
                                </select>
                                <input type="password"  className="input" name="password" minLength="8" maxLength="20" required onChange={(e)=>{ passwordset(e.target.value)}} placeholder="Password" />
                            </form>
                            {save_msg !== "" ?
                                <div className='save-info'>
                                    <p>{save_msg}</p>
                                </div> : ""}
                            <button className="submit-btn" onClick={addUser}>Sign up</button>
                    </div>
                    <div  className="login slide-up">
                        <div  className="center">
                            <h2  className="form-title" id="login"><span>or</span>Log in</h2>
                            <form  className="form-holder">
                                <input type="text" className="input" name="user_name" required onChange={(e)=>{ userid_loginset(e.target.value)}} placeholder="User Name" />
                                <input type="password" className="input" name="password" minLength="8" maxLength="20" required onChange={(e)=>{ password_loginset(e.target.value)}} placeholder="Password" />
                            </form>
                            {
                                <div className='login-info'>
                                    {wrongLogin!=="" ? <p>{wrongLogin}</p> : ""}
                                </div>
                            }
                            <button  className="submit-btn" onClick={userAuthorization}>Log in</button>
                        </div>
                    </div>
                </div>
            </div>
        </ScUserLogin>
    );
}

export default UserLogin;
