import ScCanvas from './ScCanvas';
import { Stage, Layer, Line , Circle } from "react-konva";
import {useState, useEffect, useCallback} from "react";
import {string, dict, array} from 'prop-types';
import { ATTRIBUTE_TYPES } from '../../Constants';
import { EventHandlers, handleDrag, handleDragStart, handleDragEnd, handleMouseMove, handleMouseUp} from '../../Constants/utils';

const Canvas = ({window_size, selectedTool, selectedType, importJson}) => {

const [isDraging, setIsDraging] = useState(false);
const [firstClick, setfirstClick] = useState(false);
const [enterPress, setEnterPress] = useState(false);
const [lineColor, setLineColor] = useState("green");
const [lineCount, setLineCount] = useState(0);
const [currentPoint, setcurrentPoint] = useState({});
const [newLine, setNewLine] = useState({draw: false});
const [lines, setLines] = useState([]);
const [point, setPoint] = useState([]);
const [pointCounter, setPointCounter] = useState(0);

useEffect(() => {
  if (lineCount < lines.length){
    if(newLine.node === "internal")
      lines.pop()
    lines.pop()
  }
    
  if(firstClick){
    if(enterPress){
      setfirstClick(false)
      setEnterPress(false)
    }
    else
      setLines([...lines, {previous_id: pointCounter-1, next_id: pointCounter, x_start:point[point.length-1].x, y_start:point[point.length-1].y, x_end:currentPoint.x, y_end:currentPoint.y}]);
  }
   else if(isDraging){
    if(newLine.node === "internal")
      setLines([...lines,
        {previous_id: newLine.previous_id-1, next_id: newLine.previous_id, x_start:newLine.xP_start, y_start:newLine.yP_start, x_end:currentPoint.x, y_end:currentPoint.y},
        {previous_id: newLine.previous_id, next_id: newLine.next_id, x_start:currentPoint.x, y_start:currentPoint.y, x_end:newLine.xN_end, y_end:newLine.yN_end}
      ]);
    else if( newLine.node === "external")
      setLines([...lines, {previous_id: newLine.previous_id, next_id: newLine.next_id, x_start:currentPoint.x, y_start:currentPoint.y, x_end:newLine.x_end, y_end:newLine.y_end}]);
    else if( newLine.node === "external_end")
      setLines([...lines, {previous_id: newLine.previous_id-1, next_id: newLine.previous_id, x_start:newLine.x_start, y_start:newLine.y_start, x_end:currentPoint.x, y_end:currentPoint.y}]);
  }
},[newLine,currentPoint,enterPress]);

useEffect(() => {
  const attribute = ATTRIBUTE_TYPES.find(({Name}) => Name === selectedType)
  if(attribute != null)
    setLineColor()
},[selectedType]);

useEffect(() => {
  if(Object.keys(importJson).length !== 0){
    setPoint(importJson.point)
    setLines(importJson.lines)
    setLineCount(importJson.lines.length)
  }
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

const removeLine = (drag, prev_id, nxt_id) => {
  const line = lines.find(({previous_id, next_id}) => previous_id === (prev_id) && next_id === (nxt_id))
  const line_prev = lines.find(({previous_id, next_id}) => previous_id === (prev_id-1) && next_id === (prev_id))

  if(line_prev !== undefined && line === undefined){
    setLines(lines.filter(({previous_id, next_id}) => previous_id !== (prev_id-1) && next_id !== (prev_id)))
    setLineCount(lineCount-1)
    if(drag) setNewLine({node: "external_end", previous_id: prev_id, next_id: nxt_id, x_start: line_prev.x_start, y_start: line_prev.y_start, x_end: line_prev.x_end, y_end: line_prev.y_end})
  }
  else if(line_prev !== undefined){
    setLines(lines.filter(({previous_id, next_id}) => previous_id !== (prev_id) && next_id !== (nxt_id) && previous_id !== (prev_id-1) && next_id !== (prev_id)))
    setLineCount(lineCount-2)  
    if(drag) setNewLine({node: "internal", previous_id: prev_id, next_id: nxt_id, xP_start: line_prev.x_start, yP_start: line_prev.y_start, xN_end: line.x_end, yN_end: line.y_end})
  }
  else if(line !== undefined){
    setLines(lines.filter(({previous_id, next_id}) => previous_id !== (prev_id) && next_id !== (nxt_id)))
    setLineCount(lineCount-1)
    if(drag) setNewLine({node: "external", previous_id: prev_id, next_id: nxt_id, x_start: line.x_start, y_start: line.y_start, x_end: line.x_end, y_end: line.y_end})
  }
}
    return (
      <>
      <ScCanvas>
        <Stage
          className="konva"
          width={window_size.offsetWidth}
          height={window_size.offsetHeight}
          onMousemove={(e) => handleMouseMove({e, setcurrentPoint, firstClick})}
          onMouseup={(e) => handleMouseUp({e, setPoint, setPointCounter, setLineCount, setfirstClick, removeLine, point, pointCounter, firstClick, lineCount, selectedTool, setIsDraging, isDraging})}
          onDragStart={(e) => handleDragStart({e, setIsDraging, removeLine})}
          onDragMove={(e) => handleDrag({e, setcurrentPoint})}
          onDragEnd={(e) => handleDragEnd({e, setLineCount, setNewLine, lineCount, newLine})}>
            <Layer>
              {lines.map((element) => 
                  <Line
                    points={[element.x_start, element.y_start, element.x_end, element.y_end]}
                    stroke={lineColor}
                    strokeWidth={4}
                    tension={0.2}
                    lineCap="round"
                  ></Line>)}

              {point.map((element) =>
                  <Circle
                  id = {element.id+""}
                  key={element.id}
                  x={element.x}
                  y={element.y}
                  width={12}
                  height={12}
                  fill={lineColor}
                  draggable
                />
              )}
            </Layer>
          </Stage>
      </ScCanvas>
      </>
    );
}
Canvas.propTypes = {
  window_size: dict,
  selectedTool: string,
  selectedType: string,
  importJson: dict
};

Canvas.defaultProps = {
  window_size: {},
  selectedTool: "",
  selectedType: "",
  importJson: {}
};
export default Canvas;