import ScEditPage from './ScEditPage';
import Navbar from '../../Components/Navbar';
import Canvas from '../../Components/Canvas';
import LeftList from '../../Components/LeftList';
import RightList from '../../Components/RightList';
import {GetFrame} from '../../ImportJson';
import imge from '../../Assets/yoga.jpg'
import Axios from '../../Api/axios'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../Api/Redux/authReducer';

const EditPage = () => {
const userName = useSelector(selectCurrentUser)
const [selectedTool, setselectedTool] = useState("");
const [selectedType, setselectedType] = useState("");
const [imageWindow, setimageWindow] = useState({});
const [frame_interval, setframe_interval] = useState([])
const [poseNames, setPoseNames] = useState([])
const [frame, setFrame] = useState()

const onImgLoad = ({ target: img }) => {
    const { offsetHeight, offsetWidth } = img;
    setimageWindow({ offsetHeight, offsetWidth })
  };
  useEffect(() => {
      //    ImportJson()
      console.log("UseEffect Requestsss ",userName)
      async function fetchData(){
          try {
              await Axios.post('/getTask',{
                  dedicated_user: userName,
              }).then((response) =>{
                  setframe_interval(response.data.tasks[0].frame_interval)
                  setPoseNames(response.data.tasks[0].pose_name)
              });
          } catch (error) {
              console.log("error ",error)
          }
      }
      fetchData()
  },[]);
    return (
        <>
        <Navbar/>
        <ScEditPage>
            <LeftList  
                onSelect={(tool) => {setselectedTool(tool)}} 
                selectedTool={selectedTool}
                onSelectedType={(type) => {setselectedType(type)}} />
            <div className="main">
                <img
                className="Image"
                id='IMG'
                src={imge}
                onLoad={onImgLoad}
                ></img>
                <Canvas window_size={imageWindow} selectedTool={selectedTool} selectedType={selectedType} importJson={frame}/>
            </div>
            <RightList PoseNames={poseNames} frame_interval={frame_interval}  onSelect={(poseIndex,frameIndex) => setFrame(GetFrame(poseIndex,frameIndex))}/>
        </ScEditPage>
        </>
    );
}
export default EditPage;