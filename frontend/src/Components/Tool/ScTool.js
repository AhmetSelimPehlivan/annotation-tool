import Styled from "styled-components";
const ScTool = Styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px;
    
    .tool-button{
        color: ${({isSelected}) => isSelected ?
        '#FFFFFF':
        '#AAAAAA'
        };
        cursor: pointer;

        &:hover, &:focus{
            color: lightgray;
        }
    }
    .tool-name{
        font-size: 15px;
        text-align: center;
    }
`;
export default ScTool;