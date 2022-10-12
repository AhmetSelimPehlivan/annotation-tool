import Axios from '../Api/axios'
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
export const GetFrame = async(poseName,image_id,frameIndex,setFrame) =>{
  try {
    await Axios.post('/getKeypoints',{
      pose_name: poseName,
      image_id: image_id,
      frameIndex: frameIndex
    }).then((response) =>{
        const keypoints = response.data.Keypoints
        let lines = []
        let point = []
        let counter = 0
        if(keypoints.length !== 0){ 
          ATTRIBUTE_CONNECTIONS.map((item,index) => {
              item.map((att,index) =>{
                const frame = keypoints.find(({bodyPart}) => bodyPart === att)
                if(index > 0)
                  lines.push({previous_id: counter-1, next_id: counter, x_start:point[point.length-1].xAxis, y_start:point[point.length-1].yAxis, x_end:frame.xAxis/3, y_end:frame.yAxis/3+10})
                point.push({id: counter, x: frame.xAxis/3, y: frame.yAxis/3+10 })
                counter++
              })
          })
        }
        setFrame({point, lines})
    });
  } catch (error) {
      console.log("error ",error)
  }
}