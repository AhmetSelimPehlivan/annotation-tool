import Styled from "styled-components";
const ScPointCordinates = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    ul{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    li{
        width: 285px;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 5px;
        padding: 5px 9px;
        border: 1px solid #413E37;
        border-radius: 3px;

        input{
            box-sizing: border-box;
            background: transparent;
            border: none;
            border-bottom: 1px solid black;
            color: white;
            padding: 5px;
        }

        p{
            color: white;
        }
        input{
            margin-left: 10px;
        }
    }
`;
export default ScPointCordinates;