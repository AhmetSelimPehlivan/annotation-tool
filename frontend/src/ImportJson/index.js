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
            
          point.push({id: counter, x: frame.yAxis * (window_size.x), y: frame.xAxis * window_size.y + 25, type: att, pre_id: pre_id, next_id: next_id})
          counter++          
        })
    });
  return point
}

export const addJsonToFrame = (frame_id,keypoints,isEdit,window_size) =>{
  return {
    "frame": frame_id,
    "isEdit": isEdit,
    "keypoints": {
      "nose": {x: (keypoints[0].y-25)/window_size.y, y: keypoints[0].x/window_size.x },
      "left_ankle": {x: (keypoints[1].y-25)/window_size.y, y: keypoints[1].x/window_size.x},
      "left_knee": {x: (keypoints[2].y-25)/window_size.y, y: keypoints[2].x/window_size.x},
      "left_hip": {x: (keypoints[3].y-25)/window_size.y, y: keypoints[3].x/window_size.x},
      "left_shoulder": {x: (keypoints[4].y-25)/window_size.y, y: keypoints[4].x/window_size.x},
      "left_elbow": {x: (keypoints[5].y-25)/window_size.y, y: keypoints[5].x/window_size.x},
      "left_wrist": {x: (keypoints[6].y-25)/window_size.y, y: keypoints[6].x/window_size.x},
      "right_ankle": {x: (keypoints[7].y-25)/window_size.y, y: keypoints[7].x/window_size.x},
      "right_knee": {x: (keypoints[8].y-25)/window_size.y, y: keypoints[8].x/window_size.x},
      "right_hip": {x: (keypoints[9].y-25)/window_size.y, y: keypoints[9].x/window_size.x},
      "right_shoulder": {x: (keypoints[10].y-25)/window_size.y, y: keypoints[10].x/window_size.x},
      "right_elbow": {x: (keypoints[11].y-25)/window_size.y, y: keypoints[11].x/window_size.x},
      "right_wrist": {x: (keypoints[12].y-25)/window_size.y, y: keypoints[12].x/window_size.x},
    }
  }
}