import trJson from '../Assets/trial.json'
import { ATTRIBUTE_CONNECTIONS } from '../Constants/attributeTypes';
import {prototype} from 'prop-types';

export const ImportJson = (file) => {
  const poseNames = []
  const frameList = []
  const pose = trJson.MetaInfo.records
  pose.map((item) => {
    const frame = []
    poseNames.push(item.name)
    item.records.map((index) => frame.push(index.records.frameID))
    frameList.push(frame)
  })
  return {poseNames,frameList}
}

export const GetFrame = (poseIndex,frameIndex) =>{
  const pose = trJson.MetaInfo.records[poseIndex].records[frameIndex].records
  let lines = []
  let point = []
  let counter = 0
  console.log(pose)
  if(pose.length !== 0){ 
    ATTRIBUTE_CONNECTIONS.map((item,index) => {
        item.map((att,index) =>{
          const frame = pose.keypoints.find(({bodyPart}) => bodyPart === att)
          if(index > 0)
            lines.push({previous_id: counter-1, next_id: counter, x_start:point[point.length-1].x, y_start:point[point.length-1].y, x_end:frame.x/4, y_end:frame.y/4})
          point.push({id: counter, x: frame.x/4, y: frame.y/4 })
          counter++
        })
    })
  }
  return {point, lines}
}