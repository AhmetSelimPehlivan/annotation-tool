import Styled from "styled-components";
const ScNavbar = Styled.div`
    width: 100%;
    height: 75px;
    background: #EE7363;
    display: flex;
    align-items: center;
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
    
`;
export default ScNavbar;