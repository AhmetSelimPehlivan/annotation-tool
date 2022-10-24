import { useState, useEffect } from 'react';
import Axios from '../../Api/axios';
import ScEditPage from './ScEditPage';
import Navbar from '../../Components/Navbar';
import Canvas from '../../Components/Canvas';
import LeftList from '../../Components/LeftList';
import RightList from '../../Components/RightList';
import { EditWidowSize } from '../../Constants';
import { GetPointAndLines } from '../../ImportJson';

const EditPage = () => {
const [selectedTool, setselectedTool] = useState("");
const [selectedType, setselectedType] = useState("");
const [task_id, setTask_id] = useState()
const [tasks, setTasks] = useState([])
const [frame, setFrame] = useState([])

  useEffect(() => {
    const fetchData = async() => {
      try {
        let task;
        await Axios.get('/getsession',{withCredentials: true}).then((response) =>{
          setTasks(response.data.tasks)
          if(task_id === undefined){
            task = response.data.tasks[0]
            console.log(task)
            setTask_id(task._id)
          }
          else
            task = response.data.tasks.find(({_id}) => _id === task_id)
          setFrame(GetPointAndLines(task.frames[0]))
        });
      } catch (error) {
          console.log("error ",error)
      }
    }
    fetchData()
  },[task_id]);

  const onSubmit = async(lines) =>{
    console.log("OnSubmit ")
    let task = tasks.find(({_id}) => _id === task_id)
    await Axios.post('/addCompletedTask',{
      pose_name: task.pose_name,
      image_id: task.image_id,
      poses: lines,
      task_id: task_id
      },{withCredentials: true}).then((response) => {
        setTasks(response.data.tasks)
        if(response.data.isTaskFinished){
          //Finish Task
          task = response.data.tasks[0]
        }
        else
          task = response.data.tasks.find(({_id}) => _id === task_id)
        setFrame(GetPointAndLines(task.frames[0]))
    })};
  
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
            <RightList tasks={tasks} onSelect={(id) => setTask_id(id)}/>
        </ScEditPage>
        </>
    );
}
export default EditPage;