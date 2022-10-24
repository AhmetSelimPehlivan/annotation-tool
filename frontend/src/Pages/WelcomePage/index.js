import { useState, useEffect} from 'react';
import {socket} from "../../Constants/socket";
import ScWelcomePage from './ScWelcomePage';
import Navbar from '../../Components/Navbar';
import Card from '../../Components/Card';
import Axios from '../../Api/axios'

const WelcomePage = () => {
    const userName = sessionStorage.getItem("user_name")
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
            cardProps.available_frame_count[pose_index] -=frame_req
            socket.emit('available_frame_count',cardProps.available_frame_count)
            setCardProps(prevProps => ({...prevProps, available_frame_count: cardProps.available_frame_count}))
            await Axios.post('/getKeypoints',{
                pose_name: pose_name,
                image_id: image_id,                
                frame_start: frame_start,
                frame_end: (frame_start+frame_req)
              }).then( async(response) => {
                await Axios.post('/addTask',{
                    pose_name:  pose_name,
                    image_id:  image_id,
                    frame: response.data.Keypoints,
                    frame_interval: {start:frame_start, end:(frame_start+frame_req)},
                    dedicated_user:  userName,
                    finished_frame_count:  0,
                },{withCredentials: true}).then( async () =>{
                    console.log("addTask resp")
                    await Axios.post('/update_frame',{
                        pose_name:  pose_name,
                        image_id:  image_id,
                        pose_index: pose_index,
                        minus_frame_count: frame_req
                    })
                })
            });
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