import Styled from "styled-components";
const ScCanvas = Styled.div`

display: flex;
flex-direction: column;
align-items: center;
position: relative;
margin-top: 10px;

canvas{
  margin-top: 10px;
}
.points{
  display: flex;
  position: absolute;
  flex-direction: column;

  .point-number{
    width: auto;
    color: white;
    align-self: end;
    background-color: #389017;
  }
  svg{
    fill: #4FC323;
  }
}

.Submit-Button{
  width: 50%;
  height: 40px;
  color: white;
  background: green;
  border-radius: 10px;
  margin-top: 10px;
  backgorund: trasparent;
  opacity: 1 !important;
  outline: none;
  cursor: pointer;
}
`;
export default ScCanvas;