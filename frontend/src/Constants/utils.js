import { REGION_TYPES } from './regionTypes';
export const handleDrag = ({e, setcurrentPoint}) => {
  const currentPoint = e.target.attrs
  setcurrentPoint({id: currentPoint.id, x: currentPoint.x, y: currentPoint.y, type: currentPoint.type})
}

export const handleDragStart = ({e, setIsDraging}) => {
  setIsDraging(true)
}

export const handleDragEnd = ({e})=>{

}

export const handleMouseMove = ({e, firstClick}) => {
  if (!firstClick) return;
  const currentPoint = e.currentTarget.getPointerPosition()
  console.log(e)
  //setcurrentPoint({id: currentPoint.index, x: currentPoint.x, y: currentPoint.y, type: currentPoint.type})
};

export const handleMouseUp = ({e, setPoint, setfirstClick, point, firstClick, selectedTool, setIsDraging, isDraging}) => {
  if (isDraging){
    setIsDraging(false)
    return
  }
  const currentPoint = e.currentTarget.getPointerPosition()
  if(selectedTool === REGION_TYPES.LINE || selectedTool === REGION_TYPES.POINT){
    setPoint([...point, {id: point.length, x: currentPoint.x, y: currentPoint.y, type: undefined }])

    if(selectedTool === REGION_TYPES.LINE){
      if (!firstClick)
        setfirstClick(true)
    }
  }
  else if(selectedTool === REGION_TYPES.ERASER){
    const pt = e.target.attrs
    if(pt.id !== null)
      setPoint(point.filter(({id}) => id !== (pt.id-0)))
  }
};