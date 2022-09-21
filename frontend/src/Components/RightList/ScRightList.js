import Styled from "styled-components";
const ScRightList = Styled.div`
    background-color: #69604F;
    .right-List{
        width: 200px;
        height: 100vh;
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
            align-items: center;
            .preview{
                width: 150px;
                height: 90px;
                margin-top: 20px;
                cursor: pointer;
            }
            p{
                font-size: 12px;
                color: white;
                margin-top: 5px;
            }
        }
    }
`;
export default ScRightList;