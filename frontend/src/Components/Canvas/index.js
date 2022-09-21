import ScCanvas from './ScCanvas';
import { Stage, Layer, Line , Circle } from "react-konva";
import {useState, useEffect, useRef, useCallback} from "react";
import {string, dict} from 'prop-types';
import { REGION_TYPES } from '../../Constants/regionTypes';
import { ATTRIBUTE_TYPES } from '../../Constants';
const Canvas = ({window_size,selectedTool, selectedType}) => {

const [isDraging, setIsDraging] = useState(false);
const [firstClick, setfirstClick] = useState(false);
const [lineColor, setLineColor] = useState("green");
const [lineCount, setLineCount] = useState(0);
const [start, setStart] = useState({});
const [currentPoint, setcurrentPoint] = useState({});
const [newLine, setNewLine] = useState({draw: false});
const [lines, setLines] = useState([]);
const [point, setPoint] = useState([]);
const firstUpdate = useRef(true);

useEffect(() => {
  if (firstUpdate.current) return;
  setPoint([...point, {id :point.length, element: <Circle
    id = {point.length+""}
    key={point.length+1}
    x={start.x}
    y={start.y}
    width={12}
    height={12}
    fill={lineColor}
    draggable
  />}])
},[start]);

useEffect(() => {
  if (firstUpdate.current) {
    firstUpdate.current = false;
    return;
  }
  var line_points = {x_start: 0, y_start: 0, x_end: 0, y_end: 0}
  const id = isDraging ? point.length-2 : point.length-1
  if(newLine.draw != false){
    if(newLine.draw === "start")
      line_points = {x_start: currentPoint.x, y_start: currentPoint.y, x_end: newLine.start.x, y_end: newLine.start.y}
    else if( newLine.draw === "end")
      line_points = {x_start: newLine.end.x, y_start: newLine.end.y, x_end: currentPoint.x, y_end: currentPoint.y}
    }
  else{
    line_points = {x_start: start.x, y_start: start.y, x_end: currentPoint.x, y_end: currentPoint.y}
  }
  
  if (lineCount < lines.length)
    lines.pop()
  setLines([...lines, {first_point_id:id , startPosition:{x:line_points.x_start, y:line_points.y_start}, endPosition:{x:line_points.x_end, y:line_points.y_end} ,element: 
                    <Line
                      points={[line_points.x_start, line_points.y_start, line_points.x_end, line_points.y_end]}
                      stroke={lineColor}
                      strokeWidth={4}
                      tension={0.2}
                      lineCap="round"
                    ></Line>}]);
},[newLine]);

useEffect(() => {
  const attribute = ATTRIBUTE_TYPES.find(({Name}) => Name === selectedType)
  if(attribute != null)
    setLineColor(ATTRIBUTE_TYPES.find(({Name}) => Name === selectedType).Color)
},[selectedType]);

const handleMouseMove = (e) => {
  if (!firstClick) return;
  const currentPoint = e.currentTarget.getPointerPosition()
  setcurrentPoint({x:currentPoint.x,y:currentPoint.y})
};

const removeLine = (id) => {
  setLines(lines.filter(({first_point_id}) => first_point_id !== (id)))
  setLineCount(lineCount-1)
  console.log("remove ",lines.length)
}

const handleDragStart = (e) => {
  setIsDraging(true)
  const pt = e.target.attrs
  console.log("pt ", pt, lines)
  if(pt.id === null) return
  const firstNode = lines.find(({first_point_id}) => first_point_id === (pt.id-0))
  const secondNode = lines.find(({first_point_id}) => first_point_id === (pt.id-1))

  console.log("HandleDrag ", firstNode," ",secondNode)
  if(firstNode){
    removeLine(pt.id-0)
    setNewLine({draw: "start" ,start: firstNode.endPosition, end:{}})
  }
  else if (secondNode){
    removeLine(pt.id-1)
    setNewLine({draw: "end",start: {}, end:secondNode.startPosition})
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

const handleMouseUp = (e) => {
  if (isDraging){
    setIsDraging(false)
    return
  }
  const currentPoint = e.currentTarget.getPointerPosition()
  if(selectedTool === REGION_TYPES.LINE){
    if (!firstClick) setfirstClick(true)
    else {
      setfirstClick(false)
      setLineCount(lineCount+1)
    }
  }

  if(selectedTool === REGION_TYPES.LINE || selectedTool === REGION_TYPES.POINT){
    setStart({
      x: currentPoint.x,
      y: currentPoint.y
    });
  }
};

const handleMouseDown = (e) => {
  if(selectedTool === REGION_TYPES.ERASER){
    const pt = e.target.attrs
    if(pt.id === null) return
    const firstNode = lines.find(({first_point_id}) => first_point_id === (pt.id-0))
    const secondNode = lines.find(({first_point_id}) => first_point_id === (pt.id-1))
    if(firstNode) removeLine(pt.id-0)
    else if (secondNode) removeLine(pt.id-1)
    
    setPoint(point.filter(({id}) => id !== (pt.id-0)))
  }
  else if(selectedTool === REGION_TYPES.CLICK){
    e.target.setAttrs({
      scaleX: 1.2,
      scaleY: 1.2,
      shadowBlur: 4,
      strokeWidth: 1
    });
  }
}

    return (
      <>
      <ScCanvas>
        <Stage
          className="konva"
          width={window_size.offsetWidth}
          height={window_size.offsetHeight}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onMouseDown={handleMouseDown}
          onDragStart={handleDragStart}
          onDragMove={handleDrag}
          onDragEnd={handleDragEnd}>
            <Layer>
              {lines.map((index) => (index.element))}
              {point.map((index) => (index.element))}
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