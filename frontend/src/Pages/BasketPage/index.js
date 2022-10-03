import ScBasketPage from './ScBasketPage';
import Navbar from '../../Components/Navbar';
import Card from '../../Components/Card';
import {string, dict, array} from 'prop-types';
import { useState, useEffect } from 'react';
import Axios from '../../Api/axios'
import { selectCurrentUser } from '../../Api/Redux/authReducer';
import { useSelector } from 'react-redux'

const BasketPage = () => {

const [tasks,setTasks] = useState([])
const userName = useSelector(selectCurrentUser)
useEffect(() => {
    //    ImportJson()
    console.log("UseEffect Requestsss ",userName)
    async function fetchData(){
        try {
            await Axios.post('/getTask',{
                dedicated_user: userName,
            }).then((response) =>{
                setTasks(response.data.tasks)
            });
        } catch (error) {
            console.log("error ",error)
        }
    }
    fetchData()
},[]);

const onPick = async (image_Name,pose_name,pose_index,frame_start,frame_req)=>{
    try { console.log(frame_start,frame_req)
        /* await Axios.post('/removeTask',{
            image_name:  image_Name,
            pose_name:  pose_name,
            pose_index: pose_index,
            frame_interval: [frame_start,(frame_start+frame_req)],
            dedicated_user:  userName,
            finished_frame_count:  0,
        }).then( async () =>{console.log("Seric",image_Name)
           await Axios.post('/update_frame',{
                image_name:  image_Name,
                pose_index: pose_index,
                minus_frame_count: frame_req
            })
        });*/
    } catch (error) {
        console.log("error ",error)
    }
}
    return (
        <ScBasketPage>
            <Navbar/>
            <div className='main'>
                {
                    tasks.map((task) =>
                        <Card name={task.image_name} poseNames={task.pose_name} frame_count={task.finished_frame_count} available_frame_count={task.frame_interval} isBasket={true} onPick={onPick}/>
                    )
                }
            </div>
        </ScBasketPage>
    );
}
BasketPage.propTypes = {
    importJson: dict
  };
  
BasketPage.defaultProps = {
    importJson: {}
};
export default BasketPage;