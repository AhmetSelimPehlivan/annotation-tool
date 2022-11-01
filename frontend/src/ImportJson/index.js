import { useSelector } from 'react-redux'
import { selectLines } from '../Api/Redux/editReducer';
import { ATTRIBUTE_CONNECTIONS } from '../Constants/attributeTypes'

export const GetFrameIntervals = (Frames) =>{
  let frames = []
  Frames.map((element,index) =>{
      let frame_interval = []
      let frame_length = parseInt(element.length/100)
      for (let i = 0; i < frame_length; i++)
          frame_interval.push("["+i*100+"-"+((i*100)+99)+"]")
      frame_interval.push("["+frame_length*100+"-"+((frame_length*100)+element.length%100)+"]")
      frames.push(frame_interval)
  })
  return frames
}

export const GetFrameLengths = (Frames) =>{
  let frames = []
  Frames.map((element) =>{
      frames.push(element.length)
  })
  return frames
}

export const GetPointAndLines = (keypoints) =>{
  let counter = 0
  let lines = []
  let point = []
    ATTRIBUTE_CONNECTIONS.map((item,index) => {
        item.map((att,index) =>{
          const frame = keypoints.find(({bodyPart}) => bodyPart === att)
          if(index > 0)
            lines.push({previous_id: counter-1, next_id: counter, x_start:point[point.length-1].x, y_start:point[point.length-1].y, x_end:frame.xAxis/2, y_end:frame.yAxis/2+10})
          point.push({id: counter, x: frame.xAxis/2, y: frame.yAxis/2+10 })
          counter++
        })
    });
  return {point, lines}
}

export const Upload_file = (pose_name,image_id,frameIndex,setFrame) =>{
  const lines = useSelector(selectLines)
  console.log(lines)
  //const data = {poseData: pose_name, records: []}
}