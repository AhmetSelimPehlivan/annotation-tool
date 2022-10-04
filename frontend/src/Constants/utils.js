import { REGION_TYPES } from './regionTypes';
export const handleDrag = ({e, setcurrentPoint}) => {
  const currentPoint = e.currentTarget.getPointerPosition()
  setcurrentPoint({x:currentPoint.x,y:currentPoint.y})
}

export const handleDragStart = ({e, setIsDraging, removeLine}) => {
  console.log("dragStart")
  setIsDraging(true)
  const pt = e.target.attrs
  if(pt.id !== null)
    removeLine(true, pt.id-0, (pt.id-0)+1)
}

export const handleDragEnd = ({e, setLineCount, setNewLine, lineCount, newLine})=>{
  console.log("handleDragEnd")
  if(newLine.node === "internal"){
    setLineCount(lineCount+2)
    setNewLine({node: false})
  }
  else if(newLine.node.indexOf("external") > -1){ console.log("add")
    setLineCount(lineCount+1)
    setNewLine({node: false})
  }
}

export const handleMouseMove = ({e, setcurrentPoint, firstClick}) => {
  if (!firstClick) return;
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
        setfirstClick(true)
      else
        setLineCount(lineCount+1)
    }
  }
  else if(selectedTool === REGION_TYPES.ERASER){
    const pt = e.target.attrs
    if(pt.id !== null){
      removeLine(false, pt.id-0, (pt.id-0)+1)
      setPoint(point.filter(({id}) => id !== (pt.id-0)))
      console.log("Eraser ",point, " / " ,pt.id, " * ",pt)
    }
  }
};