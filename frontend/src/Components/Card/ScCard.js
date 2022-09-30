import Styled from "styled-components";
const ScCard = Styled.div`
    background-color: var(--ds-background-accent-gray-subtlest,#ebecf0);
    border-radius: 5px;
    box-sizing: border-box;
    margin: 30px 40px;
    margin-right: 0px;
    .list{
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        width: 300px;
        margin: 15px;
        .Pose{
            display: flex;
            flex-direction: column;
            background-color: var(--ds-surface-raised,#fff);
            border-radius: 3px;
            box-shadow: var(--ds-shadow-raised,0 1px 0 #091e4240);
            margin-bottom: 8px;
            width: 100%;
            min-height: 20px;
            text-decoration: none;
            p{
                display: flex;
                margin: 10px;
                font-size: 15px;
            }
            .list-Card{
                display: flex;
                justify-content: space-between;
                .pick-section{
                    display: flex;
                    margin: 0px 5px;
                    input{ 
                        width: 55px;
                        background: transparent;
                        border: none;
                        text-align: center;
                        &::placeholder{
                            border: none;
                            opacity: 1;
                      }
                    }
                    button{
                        width: 50px;
                        border-radius: 5px;
                        cursor: pointer;
                        border: none;
                        color: white;
                        font-size: 13px;
                    }
                    .pick-button{
                        background-color: #239B56;
                    }
                    .remove-button{
                        background-color: red;
                    }
                }
            }
        }
    }
    .image-Name{
        margin: 10px 15px;
        font-size: 20px;
    }
`;
export default ScCard;