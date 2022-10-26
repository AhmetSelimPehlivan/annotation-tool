import { useState, useEffect } from 'react';
import ScBasketPage from './ScBasketPage';
import Navbar from '../../Components/Navbar';
import Card from '../../Components/Card';
import Axios from '../../Api/axios'

const BasketPage = () => {

const [tasks,setTasks] = useState([])
const userName = sessionStorage.getItem("user_name")
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
        await Axios.post('/removeTask',{
            task_id: task_id,
            dedicated_user:  userName
        }).then( async () =>{console.log("cong Seric",task_id)
           await Axios.post('/remove_frame_post',{
                pose_name:  pose_name,
                image_id:  image_id,
                frame_interval: frame_interval
            })
        });
    } catch (error) {
        console.log("error ",error)
    }
}
    return (
        <ScBasketPage>
            <Navbar/>
            <div className='main'>{console.log(tasks)}
                {
                    tasks.map((task,index) =>
                        <Card task_id={task._id} pose_name={task.pose_name} image_id={[task.image_id]} frame_count={task.finished_frame_count} available_frame_count={task.frame_interval} isBasket={true} onPick={onPick}/>
                    )
                }
            </div>
        </ScBasketPage>
    );
}
export default BasketPage;