import Styled from "styled-components";
const ScWelcomePage = Styled.div`
.main{
    width: 100%;    
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
}
${({onSubmit}) => onSubmit
    ? `
    .loadPage{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        background: #00000075;
        .loader {
            width: 50px;
            height: 50px;
            position: absolute;
            border: 4px solid #Fff;
            top: 50%;
            animation: loader 2s infinite ease;
        }
        
        .loader-inner {
            vertical-align: top;
            display: inline-block;
            width: 100%;
            background-color: #fff;
            animation: loader-inner 2s infinite ease-in;
        }
        
        @keyframes loader {
            0% {
            transform: rotate(0deg);
            }
            
            25% {
            transform: rotate(180deg);
            }
            
            50% {
            transform: rotate(180deg);
            }
            
            75% {
            transform: rotate(360deg);
            }
            
            100% {
            transform: rotate(360deg);
            }
        }
        
        @keyframes loader-inner {
            0% {
            height: 0%;
            }
            
            25% {
            height: 0%;
            }
            
            50% {
            height: 100%;
            }
            
            75% {
            height: 100%;
            }
            
            100% {
            height: 0%;
            }
        }`
    : ""}
`
export default ScWelcomePage;