import ScCanvas from './ScCanvas';
import { Stage, Layer, Line , Circle } from "react-konva";
import { useState, useEffect } from "react";
import { string, dict, bool } from 'prop-types';
import { ATTRIBUTE_TYPES } from '../../Constants';
import { ATTRIBUTE_COLORS } from '../../Constants/attributeTypes';
import { handleDrag, handleDragStart, handleDragEnd, handleMouseMove, handleMouseUp} from '../../Constants/utils';

const Canvas = ({window_size, selectedTool, importJson, onSubmit}) => {

const [isDraging, setIsDraging] = useState(false);
const [firstClick, setfirstClick] = useState(false);
const [enterPress, setEnterPress] = useState(false);
const [onEdit, setOnEdit] = useState(false);
const [currentPoint, setcurrentPoint] = useState({});
const [point, setPoint] = useState([]);

useEffect(() => {
  if(Object.keys(importJson).length !== 0)
    setPoint(importJson.point)
},[importJson]);

useEffect(() => {
  const keyDownHandler = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
        setEnterPress(true)
    }
  };
  document.addEventListener('keydown', keyDownHandler);
  return () => {
    document.removeEventListener('keydown', keyDownHandler);
  };
}, []);

useEffect(() => {
  console.log("isdrag")
  if(isDraging){
    let pointArr = [...point];
    pointArr[currentPoint.id] = {id: parseInt(currentPoint.id), x: currentPoint.x, y: currentPoint.y, type: currentPoint.type}; 
    setPoint(pointArr)
  }
  else{

  }
},[isDraging,currentPoint,enterPress]);

    return (
      <>
      <ScCanvas>
        <Stage
          className="konva"
          width={window_size.x}
          height={window_size.y}
          onMousemove={(e) => handleMouseMove({e, firstClick})}
          onMouseup={(e) => handleMouseUp({e, setPoint, setfirstClick, point, firstClick, selectedTool, setIsDraging, isDraging})}
          onDragStart={(e) => handleDragStart({e, setIsDraging})}
          onDragMove={(e) => handleDrag({e, setcurrentPoint})}
          onDragEnd={(e) => handleDragEnd({e})}>
            <Layer>
              {point.map((element,index) =>
              <>
                {index>1 && index%7 !== 0 && element.type !== undefined ?
                  <Line
                  points={[point[index-1].x, point[index-1].y, element.x, element.y]}
                  stroke={ATTRIBUTE_COLORS[parseInt(index/7)+1]}
                  strokeWidth={4}
                  tension={0.2}
                  lineCap="round"
                  ></Line>: ""}
                <Circle
                id = {element.id+""}
                key={element.id}
                type={element.type}
                x={element.x}
                y={element.y}
                width={12}
                height={12}
                fill={element.type === "nose" || element.type === undefined ? ATTRIBUTE_COLORS[0] : ATTRIBUTE_COLORS[parseInt(index/7)+1] }
                draggable
                />
              </>
              )}
            </Layer>
          </Stage>
          {onEdit 
          ?<button className='Submit-Button' onClick={() => {setOnEdit(false); onSubmit(point, true)}}>Submit</button>
          :<div className='button-div'>
            <button className='Edit-Button' onClick={() => setOnEdit(true)}>Edit</button>
            <button className='Pass-Button' onClick={() => onSubmit(point, false)}>Pass</button>
          </div>}
          </ScCanvas>
      </>
    );
}
Canvas.propTypes = {
  window_size: dict,
  selectedTool: string,
  selectedType: string,
  importJson: dict,
  onSubmit: bool
};

Canvas.defaultProps = {
  window_size: {},
  selectedTool: "",
  selectedType: "",
  importJson: {},
  onSubmit: f => f
};
export default Canvas;