import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux'
import ScWelcomePage from './ScWelcomePage';
import Navbar from '../../Components/Navbar';
import Card from '../../Components/Card';
import { selectCurrentUser } from '../../Api/Redux/authReducer';
import Axios from '../../Api/axios'
import {socket} from "../../Constants/socket";

const WelcomePage = () => {
    const userName = useSelector(selectCurrentUser)
    const [cardProps,setCardProps] = useState({})

    useEffect(() => {
        socket.on("connect", ()=>{
            console.log(`You connected :, ${socket.id}`)
        })
        socket.on("recieve-available_frame_count", message =>{
            setCardProps(prevProps => ({...prevProps, available_frame_count: message})) 
        })
        async function fetchData(){
            try {
                await Axios.get('/getImage').then((response) =>{
                    setCardProps({pose_name: response.data.pose_name, image_id: response.data.image_id, frame_count: response.data.frame_count, available_frame_count: response.data.available_frame_count})
                });
            } catch (error) {
                console.log("error ",error)
            }
        }
        fetchData()
        return () => {socket.off('disconnect')};
    },[]);

    const onPick = async (pose_name,image_id,pose_index,frame_start,frame_req)=>{
        try {
            await Axios.post('/addTask',{
                pose_name:  pose_name,
                image_id:  image_id,
                pose_index: pose_index,
                frame_interval: {start:frame_start, end:(frame_start+frame_req)},
                dedicated_user:  userName,
                finished_frame_count:  0,
            }).then( async () =>{
               await Axios.post('/update_frame',{
                    pose_name:  pose_name,
                    image_id:  image_id,
                    pose_index: pose_index,
                    minus_frame_count: frame_req
                }).then(()=>{
                cardProps.available_frame_count[pose_index] -=frame_req
                socket.emit('available_frame_count',cardProps.available_frame_count)
                setCardProps(prevProps => ({...prevProps, available_frame_count: cardProps.available_frame_count})) 
            })})
        } catch (error) {
            console.log("error ",error)
        }
    }
    return (
        <ScWelcomePage>
            <Navbar/>
            <div className='main'>
                <Card pose_name={cardProps.pose_name} image_id={cardProps.image_id} frame_count={cardProps.frame_count} available_frame_count={cardProps.available_frame_count} isBasket={false} onPick={onPick}/>
            </div>
        </ScWelcomePage>
    );
}
export default WelcomePage;