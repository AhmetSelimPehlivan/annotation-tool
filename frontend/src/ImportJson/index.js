import trJson from '../Assets/trial.json'
import { ATTRIBUTE_CONNECTIONS } from '../Constants/attributeTypes';
import Axios from '../Api/axios'

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

export const GetFrame = async(poseName,image_id,frameIndex) =>{
  try {
    console.log("GetFrame")
    await Axios.post('/getFrame',{
      poseName: poseName,
    }).then((response) =>{
        console.log(response,"resp")
       // setframe_interval(response.data.tasks[0].frame_interval)
       // setimageID(response.data.tasks[0].image_id)

    });
  } catch (error) {
      console.log("error ",error)
  }
/*
  let lines = []
  let point = []
  let counter = 0
  console.log(pose)
  if(pose.length !== 0){ 
    ATTRIBUTE_CONNECTIONS.map((item,index) => {
        item.map((att,index) =>{
          const frame = pose.keypoints.find(({bodyPart}) => bodyPart === att)
          if(index > 0)
            lines.push({previous_id: counter-1, next_id: counter, x_start:point[point.length-1].x, y_start:point[point.length-1].y, x_end:frame.x/3, y_end:frame.y/3+10})
          point.push({id: counter, x: frame.x/3, y: frame.y/3+10 })
          counter++
        })
    })
  }
  return {point, lines}*/
}