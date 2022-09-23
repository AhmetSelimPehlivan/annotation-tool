import { REGION_TYPES } from './regionTypes';
export const handleDrag = ({e, setcurrentPoint}) => {
  const currentPoint = e.currentTarget.getPointerPosition()
  setcurrentPoint({x:currentPoint.x,y:currentPoint.y})
}

export const handleDragStart = ({e, setIsDraging, removeLine}) => {
  console.log("dragStart")
  setIsDraging(true)
  const pt = e.target.attrs

  if(pt.id !== null){
    removeLine(true, pt.id-0, "start")
    removeLine(true, pt.id-1, "end")
  }
}

export const handleDragEnd = ({e, setLineCount, setNewLine, lineCount, newLine})=>{
  console.log("handleDragEnd")
  if(newLine.draw !== false){
    setLineCount(lineCount+1)
    setNewLine({draw: false})
  }
}

export const handleMouseMove = ({e, setcurrentPoint, firstClick}) => {
  if (!firstClick) return;
  console.log("Move")
  const currentPoint = e.currentTarget.getPointerPosition()
  setcurrentPoint({x:currentPoint.x, y:currentPoint.y})
};

export const handleMouseUp = ({e, setPoint, setPointCounter, setLineCount, setfirstClick, removeLine, point, pointCounter, firstClick, lineCount, selectedTool, setIsDraging, isDraging}) => {
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
/*
export const EventHandlers = {
    HANDLEMOUSEMOVE: (e,setfirstClick) => {},
};*/