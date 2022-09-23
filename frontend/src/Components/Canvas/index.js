import ScCanvas from './ScCanvas';
import { Stage, Layer, Line , Circle } from "react-konva";
import {useState, useEffect, useCallback} from "react";
import {string, dict, array} from 'prop-types';
import { ATTRIBUTE_TYPES } from '../../Constants';
import { EventHandlers, handleDrag, handleDragStart, handleDragEnd, handleMouseMove, handleMouseUp} from '../../Constants/utils';

const Canvas = ({window_size, selectedTool, selectedType, importJson}) => {

const [isDraging, setIsDraging] = useState(false);
const [firstClick, setfirstClick] = useState(false);
const [lineColor, setLineColor] = useState("green");
const [lineCount, setLineCount] = useState(0);
const [currentPoint, setcurrentPoint] = useState({});
const [newLine, setNewLine] = useState({draw: false});
const [lines, setLines] = useState([]);
const [point, setPoint] = useState([]);
const [pointCounter, setPointCounter] = useState(0);

useEffect(() => {
  if (lineCount < lines.length)
    lines.pop()

  if(firstClick)
    setLines([...lines, {first_point_id: pointCounter-1, x_start:point[point.length-1].x, y_start:point[point.length-1].y, x_end:currentPoint.x, y_end:currentPoint.y}]);
  else if(isDraging){ //console.log("isDraging ",lines)
    if(newLine.draw === "start")
      setLines([...lines, {first_point_id: newLine.fp_id, x_start:currentPoint.x, y_start:currentPoint.y, x_end:newLine.x_end, y_end:newLine.y_end}]);
    else if( newLine.draw === "end")
      setLines([...lines, {first_point_id: newLine.fp_id, x_start:newLine.x_start, y_start:newLine.y_start, x_end:currentPoint.x, y_end:currentPoint.y}]);
  }
},[newLine,currentPoint]);

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

const removeLine = (drag, id, draw_point) => {
  const line = lines.find(({first_point_id}) => first_point_id === (id))
  if(line !== undefined){
    console.log("RemoveLine ",line)
    setLines(lines.filter(({first_point_id}) => first_point_id !== (id)))
    setLineCount(lineCount-1)
    if(drag)
      setNewLine({draw: draw_point, fp_id: id ,x_start: line.x_start, y_start: line.y_start, x_end: line.x_end, y_end: line.y_end})
    console.log("drag ",drag," - ",newLine)
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