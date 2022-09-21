import Styled from "styled-components";
const ScCanvas = Styled.div`

position: relative;
width: 100%;
height: 100%;

.konva{
  width: 100%;
  height: 100%;
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

`;
export default ScCanvas;