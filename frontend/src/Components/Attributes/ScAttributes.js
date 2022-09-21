import Styled from "styled-components";
const ScAttributes = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    ul{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center
    }
    li{
        width: 285px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5px;
        padding: 5px 9px;
        border: 1px solid #413E37;
        border-radius: 3px;


        input, select p{
            width: 100%;
            background: transparent;
            border: none;
            color: white;
            padding: 5px;

            &::placeholder{
                border: none;
                width: 100%;
                color: white;
                opacity: 1;
          }
        }
    }
    .save_Button{
        background-color: #239B56;
        cursor: pointer;
        border: none;
        button{
            cursor: pointer;
            color: white;
            background-color: #239B56;
        }
    }

    .drop-down{
        color: white;
        & select{
            background-color: #69604F;
            color: white;
            width: 100%;
            margin: 0px 10px;
            border: none;
            -webkit-appearance: button;
            appearance: button;
            outline: none;
        }
        &::before {
            position: absolute;
            width: 20%;
            height: 100%;
            text-align: center;
            font-size: 28px;
            line-height: 45px;
            color: rgba(255, 255, 255, 0.5);
            background-color: rgba(255, 255, 255, 0.1);
            pointer-events: none;
          }
        &:hover::before {
        color: rgba(255, 255, 255, 0.6);
        background-color: rgba(255, 255, 255, 0.2);
        }
        
        & select option {
        }
    }
`;
export default ScAttributes;