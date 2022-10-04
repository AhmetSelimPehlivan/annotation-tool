import Styled from 'styled-components';
import background_img from '../../Assets/userLoginBackground.png'
import background_phone from '../../Assets/phone_background.svg'
import background_phone_mask from '../../Assets/phone_mask.svg'

const ScUserLogIn = Styled.div`

@import url("https://fonts.googleapis.com/css?family=Fira+Sans");
    min-height: 100vh;
    background-image: url(${background_img});
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Fira Sans", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .phone-background{
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url(${background_phone});
        background-size: cover;
        width: 350px;
        height: 708px;
    }
    .form-structor {
        background-image: url(${background_phone_mask});
        background-size: cover;
        height: 96%;
        width: 91%;
        margin-left: 3px;
        border-radius: 40px;
        position: relative;
        overflow: hidden;
        
        &::after {
            content: '';
            opacity: .8;
            position: absolute;
            top: 0;right:0;bottom:0;left:0;
            background-repeat: no-repeat;
            background-position: left bottom;
            background-size: 500px;
        }
        
        .signup {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            width: 75%;
            z-index: 5;
            -webkit-transition: all .3s ease;
            
            
            &.slide-up {
                top: 5%;
                -webkit-transform: translate(-50%, 0%);
                -webkit-transition: all .3s ease;
            }
            
            &.slide-up .form-holder,
            &.slide-up .submit-btn {
                opacity: 0;
                visibility: hidden;
            }
            
            &.slide-up .form-title {
                font-size: 1em;
                cursor: pointer;
            }
            
            &.slide-up .form-title span {
                margin-right: 5px;
                opacity: 1;
                visibility: visible;
                -webkit-transition: all .3s ease;
            }
            
            .form-title {
                color: #fff;
                font-size: 1.7em;
                text-align: center;
                margin-right: 20px;
                
                span {
                    color: rgba(0,0,0,0.4);
                    opacity: 0;
                    visibility: hidden;
                    -webkit-transition: all .3s ease;
                }
            }
            
            .form-holder {
                border-radius: 15px;
                background-color: #fff;
                overflow: hidden;
                margin-top: 50px;
                opacity: 1;
                visibility: visible;
                -webkit-transition: all .3s ease;
                
                .input, select {
                    border: 0;
                    outline: none;
                    box-shadow: none;
                    display: block;
                    height: 30px;
                    line-height: 30px;
                    padding: 8px 15px;
                    border-bottom: 1px solid #eee;
                    width: 100%;
                    font-size: 12px;
                    
                    &:last-child {
                        border-bottom: 0;
                    }
                    &::-webkit-input-placeholder {
                        color: rgba(0,0,0,0.4);
                    }
                }
            }
            
            .submit-btn {
                background-color: rgba(0,0,0,0.4);
                color: rgba(256,256,256,0.7);
                border:0;
                border-radius: 15px;
                display: block;
                margin: 10px auto; 
                padding: 15px 45px;
                width: 100%;
                font-size: 13px;
                font-weight: bold;
                cursor: pointer;
                opacity: 1;
                visibility: visible;
                -webkit-transition: all .3s ease;
                
                &:hover {
                    transition: all .3s ease;
                    background-color: rgba(0,0,0,0.8);
                }
            }
            .save-info{
                margin: 7px 0px;
                ${({isCreated}) => isCreated ? "background-color: green;":"background-color: red;"}
                border-radius: 8px;
                p{
                    padding: 7px 12px;
                    color: white;
                    font-size: 12px;
                }
            }
        }
        
        .login {
            position: absolute;
            top: 20%;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 37px;
            background-color: #fff;
            z-index: 5;
            -webkit-transition: all .3s ease;
            
            &::before {
                content: '';
                position: absolute;
                left: 50%;
                top: -20px;
                -webkit-transform: translate(-50%, 0);
                background-color: #fff;
                width: 200%;
                height: 250px;
                border-radius: 50%;
                z-index: 4;
                -webkit-transition: all .3s ease;
            }
            
            .center {
                position: absolute;
                top: calc(50% - 10%);
                left: 50%;
                -webkit-transform: translate(-50%, -50%);
                width: 75%;
                z-index: 5;
                -webkit-transition: all .3s ease;
                
                .form-title {
                    color: #000;
                    font-size: 1.7em;
                    text-align: center;
                    margin-right: 20px;

                    span {
                        color: rgba(0,0,0,0.4);
                        opacity: 0;
                    visibility: hidden;
                    -webkit-transition: all .3s ease;
                    }
                }

                .form-holder {
                    border-radius: 15px;
                    background-color: #fff;
                    border: 1px solid #eee;
                    overflow: hidden;
                    margin-top: 50px;
                    opacity: 1;
                    visibility: visible;
                    -webkit-transition: all .3s ease;

                    .input {
                        border: 0;
                        outline: none;
                        box-shadow: none;
                        display: block;
                        height: 30px;
                        line-height: 30px;
                        padding: 8px 15px;
                        border-bottom: 1px solid #eee;
                        width: 100%;
                        font-size: 12px;

                        &:last-child {
                            border-bottom: 0;
                        }
                        &::-webkit-input-placeholder {
                            color: rgba(0,0,0,0.4);
                        }
                    }
                }

                .submit-btn {
                    background-color: #6B92A4;
                    color: rgba(256,256,256,0.7);
                    border:0;
                    border-radius: 15px;
                    display: block;
                    margin: 15px auto; 
                    padding: 15px 45px;
                    width: 100%;
                    font-size: 13px;
                    font-weight: bold;
                    cursor: pointer;
                    opacity: 1;
                    visibility: visible;
                    -webkit-transition: all .3s ease;

                    &:hover {
                        transition: all .3s ease;
                        background-color: rgba(0,0,0,0.8);
                    }
                }
            }
            
            &.slide-up {
                top: 90%;
                -webkit-transition: all .3s ease;
            }
            
            &.slide-up .center {
                top: 10%;
                -webkit-transform: translate(-50%, 0%);
                -webkit-transition: all .3s ease;
            }
            
            &.slide-up .form-holder,
            &.slide-up .submit-btn {
                opacity: 0;
                visibility: hidden;
                -webkit-transition: all .3s ease;
            }
            
            &.slide-up .form-title {
                font-size: 1em;
                margin: 0;
                padding: 0;
                cursor: pointer;
                -webkit-transition: all .3s ease;
            }
            
            &.slide-up .form-title span {
                margin-right: 5px;
                opacity: 1;
                visibility: visible;
                -webkit-transition: all .3s ease;
            }

            .login-info{
                margin: 7px 0px;
                background-color: red;
                border-radius: 8px;
                p{
                    padding: 7px 15px;
                    color: white;
                    font-size: 12px;
                }
            }
        }
    }
`;
export default ScUserLogIn;