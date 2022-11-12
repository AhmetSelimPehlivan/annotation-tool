import ScCanvas from './ScCanvas';
import { Stage, Layer, Line , Circle, Text } from "react-konva";
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
    pointArr[currentPoint.id] = {id: parseInt(currentPoint.id), x: currentPoint.x, y: currentPoint.y, type: currentPoint.type, pre_index: currentPoint.pre_index, next_index: currentPoint.next_index}; 
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
                {element.next_index !== undefined ?
                  <Line
                  points={[element.x, element.y, point[index+1].x, point[index+1].y]}
                  stroke={ATTRIBUTE_COLORS[parseInt(index/7)+1]}
                  strokeWidth={4}
                  tension={0.2}
                  zIndex={1}
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
                pre_index={element.pre_index}
                next_index={element.next_index}
                zIndex={2}
                fill={element.type === "nose" || element.type === undefined ? ATTRIBUTE_COLORS[0] : ATTRIBUTE_COLORS[parseInt(index/7)+1] }
                draggable
                />
                <Text
                  text={element.id}
                  x={element.x-5.65685}
                  y={element.y-5.65685}
                  fontSize={13}
                  fill= 'black'
                  listening= {false}
                  zIndex={3}
                ></Text>
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