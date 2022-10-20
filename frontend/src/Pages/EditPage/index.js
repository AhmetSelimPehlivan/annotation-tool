import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import ScEditPage from './ScEditPage';
import Navbar from '../../Components/Navbar';
import Canvas from '../../Components/Canvas';
import LeftList from '../../Components/LeftList';
import RightList from '../../Components/RightList';
import Axios from '../../Api/axios'
import { EditWidowSize } from '../../Constants';
import { selectCurrentUserName } from '../../Api/Redux/authReducer';
import { GetPointAndLines } from '../../ImportJson';

const EditPage = () => {
const userName = useSelector(selectCurrentUserName)
const [selectedTool, setselectedTool] = useState("");
const [selectedType, setselectedType] = useState("");
const [lastEdit, setlastEdit] = useState({})
const [frame, setFrame] = useState()
const [tasks, setTasks] = useState([])


  useEffect(() => {
      console.log("UseEffect Requestsss ",userName)
      async function fetchData(){
        try {
          await Axios.get('/getsession',{withCredentials: true}).then((response) =>{
              setTasks(response.data.tasks)
          });
        } catch (error) {
            console.log("error ",error)
        }
      }
      fetchData()
  },[]);
  
  const GetFrame = async(task_id,frameIndex) =>{
    try {
      //
      await Axios.get('/getsession',{withCredentials: true}).then((response) =>{
        setFrame(GetPointAndLines(response.data.tasks.find(({_id}) => _id === task_id)))
        //  setlastEdit({pose_name: poseName, image_id: image_id})
      });
    } catch (error) {
        console.log("error ",error)
    }
  }
  
  //// Tekrardan Bak
  const onSubmit = async(lines) =>{
    console.log("lines ",lines)
    await Axios.post('/getCompletedTask',{
      pose_name: lastEdit.pose_name,
      image_id: lastEdit.image_id}).then(async (response) =>{
      const pose_array = response.data.data.Item;
      console.log("response ",lastEdit.pose_name,"-",pose_array," ")

      if(pose_array === undefined || pose_array.length < 1)
          await Axios.post('/addCompletedTask',{
            pose_name: lastEdit.pose_name,
            image_id: lastEdit.image_id,
            poses: [lines],
            frame_count: 1
            });
        else
          { pose_array.poses.push(lines)
            await Axios.post('/updateCompletedTask',{
              pose_name: lastEdit.pose_name,
              image_id: lastEdit.image_id,
              poses: pose_array.poses,
              frame_count: pose_array.poses.length
              });
          }
    });
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
                <Canvas window_size={EditWidowSize} selectedTool={selectedTool} selectedType={selectedType} importJson={frame} onSubmit={(lines) => onSubmit(lines)}/>
            </div>
            <RightList tasks={tasks} onSelect={(poseName,image_id,frameIndex) => GetFrame(poseName,image_id,frameIndex)}/>
        </ScEditPage>
        </>
    );
}
export default EditPage;