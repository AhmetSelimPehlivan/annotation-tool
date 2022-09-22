export const handleDrag = ({e, setcurrentPoint}) => {
  const currentPoint = e.currentTarget.getPointerPosition()
  setcurrentPoint({x:currentPoint.x,y:currentPoint.y})
}
/*
export const EventHandlers = {
    HANDLEMOUSEMOVE: (e,setfirstClick) => {},
};*/