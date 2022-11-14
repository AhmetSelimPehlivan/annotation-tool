import Styled from "styled-components";
const ScRightList = Styled.div`
    background-color: #69604F;
    .right-List{
        width: 200px;
        height: 100vh;
        overflow: scroll;
        
        counter-reset: li; 
        list-style: none; 
        padding: 0;
        text-shadow: 0 1px 0 rgba(255,255,255,.5);
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
            width: 65%;
            margin: 10px;
            position: relative;
            display: block;
            padding: .4em .4em .4em .8em;
            margin: .5em 0 .5em 2.5em;
            background: #D3D4DA;
            color: #444;
            cursor: pointer;
            text-decoration: none;
            transition: all .3s ease-out;
              
            &:hover {background: #DCDDE1;}
            &:before {
                content: counter(li);
                counter-increment: li;
                position: absolute;
                left: -2.5em;
                top: 50%;
                margin-top: -1em;
                background: #f9dd94;
                height: 2em;
                width: 2em;
                line-height: 2em;
                text-align: center;
                font-weight: bold;
              }
            &:after {
                position: absolute;
                content: "";
                border: .5em solid transparent;
                left: -1em;
                top: 50%;
                margin-top: -.5em;
                transition: all .3s ease-out;
              }
            
            &:hover:after{
                left: -.5em;
                border-left-color: #f9dd94;
              }
            .Image, .TaskNumber{
                margin: 5px;
                font-size: 16px;
            }
            .TaskNumber{
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
            }
        }     
    }
`;
export default ScRightList;