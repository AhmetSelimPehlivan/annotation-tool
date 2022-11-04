import Styled from "styled-components";
const ScCanvas = Styled.div`

display: flex;
flex-direction: column;
align-items: center;
position: relative;

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

button{
  color: white;
  border-radius: 10px;
  margin-top: 10px;
  backgorund: trasparent;
  opacity: 1 !important;
  outline: none;
  cursor: pointer;
}
.button-div{
  width: 50%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;

  .Edit-Button{
    width: 40%;
    background: green;
  }
  .Pass-Button{
    width: 40%;
    background: red;
  }
}
.Submit-Button{
  width: 50%;
  height: 40px;
  background: green;
}
`;
export default ScCanvas;