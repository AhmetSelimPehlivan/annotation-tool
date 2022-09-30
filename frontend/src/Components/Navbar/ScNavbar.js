import Styled from "styled-components";
const ScNavbar = Styled.div`
    width: 100%;
    height: 60px;
    background: #EE7363;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ul{
        display: flex;
        li{
            margin-left: 20px;
            font-size: 15px;
            color: #FFFFFF;
            cursor: pointer;
        }
        .file-upload{
            cursor: pointer;
        }
        input[type="file"] {
            display: none;
        }
    }
    .User-Section{
        margin-right: 20px;
        display: flex;
        *{
            margin: 0px 5px;
            color: white;
        }
        button{
            cursor: pointer;
            background: transparent;
        }
    }
    
`;
export default ScNavbar;