import Styled from "styled-components";
const ScRightList = Styled.div`
    background-color: #69604F;
    .right-List{
        width: 200px;
        height: 100vh;
        overflow: scroll;
        .list-header{
            margin: 0px;
            padding: 20px;
            font-size: 15px;
            color: #FFFFFF;
            background-color: #413E37;
        }
        li{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            color: white;
            margin-top: 5px;
        }

        .ImageList{
            width: 180px;
            margin: 10px;
            .TaskNumber{
                margin: 5px 15px;
                font-size: 14px;
            }
            .Image, .Pose{
                margin: 5px;
                font-size: 16px;
            }
            .Pose{
                width: 100%;
                padding: 5px;
                border: 1px solid black;
            }
            .Frame{
                display: flex;
                align-items: center;
                width: 80px;
                margin: 5px 0px;
                font-size: 12px;
                cursor: pointer;
            }
        }
    }
`;
export default ScRightList;