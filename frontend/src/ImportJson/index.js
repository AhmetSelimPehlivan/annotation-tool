import trJson from '../Assets/trial.json'
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
  if(pose.length !== 0){
    pose.keypoints.map( frame =>{
      if(frame.bodyPart.indexOf("right") >= 0){
        lines.push({first_point_id: counter-1, x_start:point[point.length-1].x, y_start:point[point.length-1].y, x_end:frame.x/4, y_end:frame.y/4})
      }
        point.push({id: counter, x: frame.x/4, y: frame.y/4 })
        counter++
    })
  }
  return {point, lines}
}