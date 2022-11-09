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

export const GetPointAndLines = (keypoints,window_size) =>{
  let counter = 0
  let lines = []
  let point = []
    console.log("keypoints ",keypoints)
    console.log("window_size ",window_size)
    ATTRIBUTE_CONNECTIONS.map((item,index) => {
        item.map((att,index) =>{
          const frame = keypoints.find(({bodyPart}) => bodyPart === att)
          if(index > 0){
          //  lines.push({previous_id: counter-1, next_id: counter, x_start:point[point.length-1].x, y_start:point[point.length-1].y, x_end:frame.xAxis * (window_size.x) , y_end:frame.yAxis * (window_size.y)  })
              lines.push({previous_id: counter-1, next_id: counter, x_start: point[point.length-1].x, y_start: point[point.length-1].y, x_end: frame.yAxis * (window_size.x) , y_end: frame.xAxis * (window_size.y + 50)})
          }
            point.push({id: counter, x: frame.yAxis * (window_size.x) , y: frame.xAxis * (window_size.y + 50)})
          //  point.push({id: counter, x: frame.xAxis * (window_size.x) , y: frame.yAxis * (window_size.y) })
          counter++
          
        })
    });
  console.log(lines)
  return {point, lines}
}

export const AddPointAndLines = (lines,window_size) =>{
  console.log(lines)
  /*
  let counter = 0
  let lines = []
  let point = []
    console.log("keypoints ",keypoints)
    console.log("window_size ",window_size)
    ATTRIBUTE_CONNECTIONS.map((item,index) => {
        item.map((att,index) =>{
          const frame = keypoints.find(({bodyPart}) => bodyPart === att)
          if(index > 0){
          //  lines.push({previous_id: counter-1, next_id: counter, x_start:point[point.length-1].x, y_start:point[point.length-1].y, x_end:frame.xAxis * (window_size.x) , y_end:frame.yAxis * (window_size.y)  })
              lines.push({previous_id: counter-1, next_id: counter, x_start: point[point.length-1].x, y_start: point[point.length-1].y, x_end: frame.yAxis * (window_size.x) , y_end: frame.xAxis * (window_size.y + 50)})
          }
            point.push({id: counter, x: frame.yAxis * (window_size.x) , y: frame.xAxis * (window_size.y + 50)})
          //  point.push({id: counter, x: frame.xAxis * (window_size.x) , y: frame.yAxis * (window_size.y) })
          counter++
          
        })
    });*/
  return lines
}