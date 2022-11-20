import Styled from "styled-components";
const ScLeftList = Styled.div`
    background-color: #69604F;
    .list{
        width: 140px;
        height: 100vh;
    }
    .shape-tools{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        margin: 5px;
    }
    .keypoint-div{ 
        position: relative;
    }
    .keypoint-list{
        padding-left: 10px;
        padding-top: 10px;
        list-style: none;

        .keypoint-item{
            padding: 3px 0px;
            box-sizing: border-box;
            color: white;
        }
    }
    .list-header{
        margin: 0px;
        padding: 10px 8px;
        font-size: 15px;
        text-align: center;
        color: #FFFFFF;
        background-color: #413E37;
    }
`;
export default ScLeftList;