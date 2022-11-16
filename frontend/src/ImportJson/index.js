import { ATTRIBUTE_CONNECTIONS } from '../Constants/attributeTypes'

export const GetPointAndLines = (frame,window_size) =>{
  let counter = 0
  let point = []
  const keypoints = frame.keypoints
    ATTRIBUTE_CONNECTIONS.map((item,list_index) => {
        item.map((att,index) =>{
          const frame = keypoints.find(({bodyPart}) => bodyPart === att)
          var next_id = undefined
          var pre_id = undefined
          if((item.length-1) > index)
            next_id = counter+1
          if(index > 0)
            pre_id = counter-1
          point.push({id: counter, x: frame.yAxis * (window_size.x+50), y: frame.xAxis * (window_size.y+50), type: att, pre_id: pre_id, next_id: next_id})
          counter++          
        })
    });
  return point
}

export const addJsonToFrame = (frame_id,keypoints,window_size) =>{
  return {
    "frame": frame_id,
    "keypoints": {
      "nose": {x: keypoints[0].y/window_size.y, y: keypoints[0].x/window_size.x},
      "left_ankle": {x: keypoints[1].y/window_size.y, y: keypoints[1].x/window_size.x},
      "left_knee": {x: keypoints[2].y/window_size.y, y: keypoints[2].x/window_size.x},
      "left_hip": {x: keypoints[3].y/window_size.y, y: keypoints[3].x/window_size.x},
      "left_shoulder": {x: keypoints[4].y/window_size.y, y: keypoints[4].x/window_size.x},
      "left_elbow": {x: keypoints[5].y/window_size.y, y: keypoints[5].x/window_size.x},
      "left_wrist": {x: keypoints[6].y/window_size.y, y: keypoints[6].x/window_size.x},
      "right_ankle": {x: keypoints[7].y/window_size.y, y: keypoints[7].x/window_size.x},
      "right_knee": {x: keypoints[8].y/window_size.y, y: keypoints[8].x/window_size.x},
      "right_hip": {x: keypoints[9].y/window_size.y, y: keypoints[9].x/window_size.x},
      "right_shoulder": {x: keypoints[10].y/window_size.y, y: keypoints[10].x/window_size.x},
      "right_elbow": {x: keypoints[11].y/window_size.y, y: keypoints[11].x/window_size.x},
      "right_wrist": {x: keypoints[12].y/window_size.y, y: keypoints[12].x/window_size.x},
    }
  }
}