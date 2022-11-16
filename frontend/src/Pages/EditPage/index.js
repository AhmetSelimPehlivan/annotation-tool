import { useState, useEffect } from 'react';
import Axios from '../../Api/axios';
import ScEditPage from './ScEditPage';
import Navbar from '../../Components/Navbar';
import Canvas from '../../Components/Canvas';
import LeftList from '../../Components/LeftList';
import RightList from '../../Components/RightList'
import { EditWidowSize } from '../../Constants';
import { GetPointAndLines, addJsonToFrame } from '../../ImportJson';

const EditPage = () => {

const [selectedTool, setselectedTool] = useState("");
const [selectedType, setselectedType] = useState("");
const [task_id, setTask_id] = useState()
const [tasks, setTasks] = useState([])
const [frame, setFrame] = useState({})
const [imge, setImge] = useState(null)

  useEffect(() => {
    const fetchData = async() => {
      try {
        await Axios.get('/getsession',{withCredentials: true}).then(async (response) =>{
          let task;
          setTasks(response.data.tasks)
          if(task_id === undefined){
            task = response.data.tasks[0]
            setTask_id(task.id)
          }
          else
            task = response.data.tasks.find(({id}) => id === task_id)
          
          console.log("useEFFECT ",task.frames[0][0].frame)
          await Axios.post('/getimage-from-s3',{
            frame_id: task.frames[0][0].frame
          }).then((response) => {
            setImge(response.data.bucketData)
          })
          setFrame({frame_name: task.frames[0][0].frame, keypoints: GetPointAndLines(task.frames[0][0],EditWidowSize)})
          });
      } catch (error) {
          console.log("error ",error)
      }
    }
    fetchData()
  },[task_id]);

  const onSubmit = async(frame_name, keypoints, isEdited) =>{
    let task = tasks.find(({id}) => id === task_id)
    await Axios.post('/addCompletedTask',{
      pose_name: task.pose_name,
      image_id: task.image_id,
      frame: addJsonToFrame(frame_name,keypoints,EditWidowSize),
      task_id: task_id
      },{withCredentials: true}).then(async (response) => {
        if(response.data.isTaskFinished)
          task = response.data.tasks[0]
        else
          task = response.data.tasks.find(({id}) => id === task_id)

        if(task === undefined){
          setFrame({})
          setTasks([])
        }
        else{
          setTasks(response.data.tasks)
          setTask_id(task.id)
        }
      })
  };

    return (
        <>
        <Navbar/>
        <ScEditPage window_size={EditWidowSize}>
            <LeftList  
                onSelect={(tool) => {setselectedTool(tool)}} 
                selectedTool={selectedTool}
                onSelectedType={(type) => {setselectedType(type)}} />
            <div className="main">
                <div className='Image-div'/>
                <img
                  className="Image"
                  id='IMG'
                  src={`data:image/jpg;base64,${imge}`}
                  alt="Pose Frame"
                  ></img>
                <Canvas window_size={EditWidowSize} selectedTool={selectedTool} selectedType={selectedType} importJson={frame} onSubmit={(frame_name, points, isedit) => onSubmit(frame_name, points, isedit)}/>
            </div>
            <RightList tasks={tasks} onSelect={(id) => setTask_id(id)}/>
        </ScEditPage>
        </>
    );
}
export default EditPage;