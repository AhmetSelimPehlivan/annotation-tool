import ScCanvas from './ScCanvas';
import { Stage, Layer, Line , Circle } from "react-konva";
import {useState, useEffect, useRef, useCallback} from "react";
import {string, dict} from 'prop-types';
import { REGION_TYPES } from '../../Constants/regionTypes';
import { ATTRIBUTE_TYPES } from '../../Constants';
import { EventHandlers, handleDrag } from '../../Constants/utils';

const Canvas = ({window_size,selectedTool, selectedType}) => {

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
  else if(isDraging){
    if(newLine.draw === "start")
      setLines([...lines, {first_point_id: pointCounter-2, x_start:currentPoint.x, y_start:currentPoint.y, x_end:newLine.x_end, y_end:newLine.y_end}]);
    else if( newLine.draw === "end")
      setLines([...lines, {first_point_id: pointCounter-2, x_start:newLine.x_start, y_start:newLine.y_start, x_end:currentPoint.x, y_end:currentPoint.y}]);
  }
},[newLine,currentPoint]);

useEffect(() => {
  const attribute = ATTRIBUTE_TYPES.find(({Name}) => Name === selectedType)
  if(attribute != null)
    setLineColor()
},[selectedType]);

const removeLine = (drag, id, draw_point) => {
  const line = lines.find(({first_point_id}) => first_point_id === (id))
  if(line !== undefined){
    console.log("RemoveLine ",line)
    setLines(lines.filter(({first_point_id}) => first_point_id !== (id)))
    setLineCount(lineCount-1)
    if(drag)
      setNewLine({draw: draw_point ,x_start: line.x_start, y_start: line.y_start, x_end: line.x_end, y_end: line.y_end})
  }
}

const handleDragStart = (e) => {
  setIsDraging(true)
  const pt = e.target.attrs

  if(pt.id !== null){
    removeLine(true, pt.id-0, "start")
    removeLine(true, pt.id-1, "end")
  }
}

const handleDrag = (e) => {
  const currentPoint = e.currentTarget.getPointerPosition()
  setcurrentPoint({x:currentPoint.x,y:currentPoint.y})
}

const handleDragEnd = (e)=>{
  if(newLine.draw !== false){
    setLineCount(lineCount+1)
    setNewLine({draw: false})
  }
}


const handleMouseMove = (e) => {
  if (!firstClick) return;
  const currentPoint = e.currentTarget.getPointerPosition()
  setcurrentPoint({x:currentPoint.x, y:currentPoint.y})
};

const handleMouseUp = (e) => {
  console.log("MouseUp")
  if (isDraging){
    setIsDraging(false)
    return
  }

  const currentPoint = e.currentTarget.getPointerPosition()
  if(selectedTool === REGION_TYPES.LINE || selectedTool === REGION_TYPES.POINT){
    setPoint([...point, {id: pointCounter, x: currentPoint.x, y: currentPoint.y }])
    setPointCounter(pointCounter+1)

    if(selectedTool === REGION_TYPES.LINE){
      if (!firstClick)
        setLineCount(lineCount+1)
      setfirstClick(!firstClick)
    }
  }
  else if(selectedTool === REGION_TYPES.ERASER){
    const pt = e.target.attrs
    if(pt.id !== null){
      removeLine(false, pt.id-0, "")
      removeLine(false, pt.id-1, "")
      setPoint(point.filter(({id}) => id !== (pt.id-0)))
      console.log("Eraser ",point, " / " ,pt.id, " * ",pt)
    }
  }
};

    return (
      <>
      <ScCanvas>
        <Stage
          className="konva"
          width={window_size.offsetWidth}
          height={window_size.offsetHeight}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onDragStart={handleDragStart}
          onDragMove={handleDrag}
          onDragEnd={handleDragEnd}>
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
  selectedType: string
};

Canvas.defaultProps = {
  window_size: {},
  selectedTool: "",
  selectedType: ""
};
export default Canvas;