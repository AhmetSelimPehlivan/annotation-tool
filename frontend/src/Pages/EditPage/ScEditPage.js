import Styled from "styled-components";
const EditPage = Styled.div`
    display: flex;
    justify-content: space-between;
    .main{
        margin: 0px 15px;
        .Image{
            position: absolute;
            width: ${({window_size}) => window_size.x}px;
            height: ${({window_size}) => window_size.y}px;
        }
        .Image-div{
            width: ${({window_size}) => window_size.x}px;
            height: ${({window_size}) => window_size.y}px;
            background: black;
            position: absolute;
            visibility: visible !important;
            opacity: 1 !important;
            outline: none;
        }
    }
`;
export default EditPage;