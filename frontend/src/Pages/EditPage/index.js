import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import ScEditPage from './ScEditPage';
import Navbar from '../../Components/Navbar';
import Canvas from '../../Components/Canvas';
import LeftList from '../../Components/LeftList';
import RightList from '../../Components/RightList';
import Axios from '../../Api/axios'
import {GetFrame} from '../../ImportJson';
import { selectCurrentUser } from '../../Api/Redux/authReducer';
import { EditWidowSize } from '../../Constants';
import {Caches} from '../../Constants/caches'

const EditPage = () => {
const userName = useSelector(selectCurrentUser)
const [selectedTool, setselectedTool] = useState("");
const [selectedType, setselectedType] = useState("");
const [frame_interval, setframe_interval] = useState([])
const [imageID, setimageID] = useState([])
const [frame, setFrame] = useState()

  useEffect(() => {
      console.log("UseEffect Requestsss ",userName)
      async function fetchData(){
          try {
              await Axios.post('/getTask',{
                  dedicated_user: userName,
              }).then((response) =>{
                  setframe_interval(response.data.tasks[0].frame_interval)
                  setimageID(response.data.tasks[0].image_id)
              });
          } catch (error) {
              console.log("error ",error)
          }
      }
      fetchData()
  },[]);

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
            <RightList imageID={imageID} frame_interval={frame_interval}  onSelect={(poseName,image_id,frameIndex) => setFrame(GetFrame(poseName,image_id,frameIndex))}/>
        </ScEditPage>
        </>
    );
}
export default EditPage;