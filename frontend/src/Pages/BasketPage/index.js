import { useState, useEffect } from 'react';
import {socket} from "../../Constants/socket";
import ScBasketPage from './ScBasketPage';
import Navbar from '../../Components/Navbar';
import Card from '../../Components/Card';
import Axios from '../../Api/axios'

const BasketPage = () => {

const [tasks,setTasks] = useState([])
const userName = sessionStorage.getItem("user_name")
const [isSubmit,setIsSubmit] = useState(false)

useEffect(() => {
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

const onPick = async (task_id,pose_name,image_id,frame_interval)=>{
    try {
        setIsSubmit(true)
        //socket.emit('available_frame_count',{image_index: image_index, available_frame_count: copy_props[image_index].available_frame_count})
            
        await Axios.post('/remove_frame_post',{
            pose_name:  pose_name,
            image_id:  image_id,
            task_id : task_id,
            frame_interval: frame_interval,
        },{withCredentials: true}).then( async (response) =>{
            await Axios.post('/removeTask',{
                task_id: task_id,
                dedicated_user:  userName
            })
            setTasks(response.data.tasks)
        });
        setIsSubmit(false)
    } catch (error) {
        setIsSubmit(false)
        console.log("error ",error)
    }
}

    return (
        <ScBasketPage onSubmit={isSubmit}>
            {isSubmit?
            <div className='loadPage'>
                <span class="loader"><span class="loader-inner"></span></span>
            </div>:""}
            <Navbar/>
            <div className='main'>{console.log(tasks)}
                {
                    tasks.map((task,index) =>
                        <Card task_id={task.id} pose_name={task.pose_name} image_id={task.image_id} frame_count={task.finished_frame_count} available_frame_count={task.frame_intervals} isBasket={true} onPick={onPick}/>
                    )
                }
            </div>
        </ScBasketPage>
    );
}
export default BasketPage;