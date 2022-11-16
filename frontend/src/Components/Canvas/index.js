import ScCanvas from './ScCanvas';
import { Stage, Layer, Line , Circle, Text } from "react-konva";
import { useState, useEffect } from "react";
import { string, dict, func } from 'prop-types';
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
    setPoint(importJson.keypoints)
  else
    setPoint([])
  setcurrentPoint({})
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
});

useEffect(() => {
  if(isDraging){
    let pointArr = [...point];
    pointArr[currentPoint.id] = {id: parseInt(currentPoint.id), x: currentPoint.x, y: currentPoint.y, type: currentPoint.type, prev_id: currentPoint.prev_id, next_id: currentPoint.next_id}; 
    setPoint(pointArr)
  }
},[isDraging,currentPoint,enterPress]);

    return (
      <>
      <ScCanvas window_size={window_size}>
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
                {element.next_id !== undefined ?
                  <Line
                  points={[element.x, element.y, point[index+1].x, point[index+1].y]}
                  stroke={ATTRIBUTE_COLORS[parseInt(index/7)+1]}
                  strokeWidth={4}
                  tension={0.2}
                  lineCap="round"
                  ></Line>: ""
                }
                <Circle
                id = {element.id+""}
                key={element.id}
                type={element.type}
                x={element.x}
                y={element.y}
                width={16}
                height={16}
                prev_id={element.prev_id}
                next_id={element.next_id}
                draggable
                fill={element.type === "nose" || element.type === undefined ? ATTRIBUTE_COLORS[0] : ATTRIBUTE_COLORS[parseInt(index/7)+1] }
                />
                <Text
                  text={element.id+1}
                  x={element.x-5.65685}
                  y={element.y-5.65685}
                  fontSize={13}
                  fill= 'black'
                  listening= {false}
                ></Text>
              </>
              )}
            </Layer>
          </Stage>
          {onEdit ? "" : <div className='EditModeDiv'></div>}
          {point.length > 0 ?
          onEdit ?<button className='Submit-Button' onClick={() => {setOnEdit(false); onSubmit((importJson.frame_name), point, true)}}>Submit</button>
          :<div className='button-div'>
            <button className='Edit-Button' onClick={() => setOnEdit(true)}>Edit</button>
            <button className='Pass-Button' onClick={() => onSubmit((importJson.frame_name), point, false)}>Pass</button>
          </div>
          : ""}

          </ScCanvas>
      </>
    );
}
Canvas.propTypes = {
  window_size: dict,
  selectedTool: string,
  selectedType: string,
  importJson: dict,
  onSubmit: func
};

Canvas.defaultProps = {
  window_size: {},
  selectedTool: "",
  selectedType: "",
  importJson: {},
  onSubmit: f => f
};
export default Canvas;