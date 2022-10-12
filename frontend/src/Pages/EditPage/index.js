import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import ScEditPage from './ScEditPage';
import Navbar from '../../Components/Navbar';
import Canvas from '../../Components/Canvas';
import LeftList from '../../Components/LeftList';
import RightList from '../../Components/RightList';
import Axios from '../../Api/axios'
import { EditWidowSize } from '../../Constants';
import { selectCurrentUser } from '../../Api/Redux/authReducer';
import { ATTRIBUTE_CONNECTIONS } from '../../Constants/attributeTypes'
import {Caches} from '../../Constants/caches'

const EditPage = () => {
const userName = useSelector(selectCurrentUser)
const [selectedTool, setselectedTool] = useState("");
const [selectedType, setselectedType] = useState("");
const [frame, setFrame] = useState()
const [tasks, setTasks] = useState([])


  useEffect(() => {
      console.log("UseEffect Requestsss ",userName)
      async function fetchData(){
          try {
              await Axios.post('/getTask',{
                  dedicated_user: userName,
              }).then((response) =>{ console.log(response.data)
                    setTasks(response.data.tasks)
              });
          } catch (error) {
              console.log("error ",error)
          }
      }
      fetchData()
  },[]);
  
  const GetFrame = async(poseName,image_id,frameIndex) =>{
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
                  console.log("frame ",index," - ",frame)
                  if(index > 0)
                    lines.push({previous_id: counter-1, next_id: counter, x_start:point[point.length-1].x, y_start:point[point.length-1].y, x_end:frame.xAxis/2, y_end:frame.yAxis/2+10})
                  point.push({id: counter, x: frame.xAxis/2, y: frame.yAxis/2+10 })
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
  
  const addCache = async (cacheName,data) =>{
    console.log("hAYD")
    localStorage.setItem(cacheName,JSON.stringify(data))
    const cache = await caches.open(cacheName);
    cache.add(data).then(() => {
        console.log("Added Succesfully")
      })
    }

    return (
        <>
        <Navbar/>
        <ScEditPage window_size={EditWidowSize}>
            <LeftList  
                onSelect={(tool) => {setselectedTool(tool)}} 
                selectedTool={selectedTool}
                onSelectedType={(type) => {setselectedType(type)}} />
            <div className="main">
                <div className='Image'/>
                <Canvas window_size={EditWidowSize} selectedTool={selectedTool} selectedType={selectedType} importJson={frame}/>
            </div>
            <RightList tasks={tasks} onSelect={(poseName,image_id,frameIndex) => GetFrame(poseName,image_id,frameIndex)}/>
        </ScEditPage>
        </>
    );
}
export default EditPage;