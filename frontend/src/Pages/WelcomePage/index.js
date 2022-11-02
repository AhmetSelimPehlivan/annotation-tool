import { useState, useEffect, useRef} from 'react';
import {socket} from "../../Constants/socket";
import ScWelcomePage from './ScWelcomePage';
import Navbar from '../../Components/Navbar';
import Card from '../../Components/Card';
import Axios from '../../Api/axios';

const WelcomePage = () => {
    const userName = sessionStorage.getItem("user_name")
    const [cardProps,setCardProps] = useState([])
    const [isSubmit,setIsSubmit] = useState(false)
    const socketRef = useRef();
    useEffect(() => {
        async function fetchData(){
            try {
                await Axios.get('/getImage').then((response) =>{
                    setCardProps(response.data.image)
                 });
            } catch (error) {
                console.log("error ",error)
            }
        }
        fetchData()
    },[]);
    
    useEffect(() => {
        socketRef.current = socket.on("recieve-available_frame_count", message =>{
            console.log("message ",message)
            console.log("copy_propsssssssssss ",cardProps)
            const copy_props = cardProps
            copy_props[message.image_index].available_frame_count=message.available_frame_count
            setCardProps(copy_props)
        })
        return () => {socketRef.current.off('disconnect')};
    },[socketRef]);

    const onPick = async (pose_name,image_id,image_index,frame_req)=>{
        try {
            setIsSubmit(true)
            const copy_props = cardProps
            copy_props[image_index].available_frame_count -= frame_req
            
            socket.emit('available_frame_count',{image_index: image_index, available_frame_count: copy_props[image_index].available_frame_count})
            console.log(frame_req)
            await Axios.post('/update_frame',{
                pose_name:  pose_name,
                image_id:  image_id,
                frame_req: frame_req
            }).then( async (response) =>{
                console.log("response ");
                await Axios.post('/addTask',{
                    pose_name: pose_name,
                    image_id: image_id,
                    frame_intervals: response.data.frame_intervals,
                    frame_req: frame_req,
                    dedicated_user:  userName
                  },{withCredentials: true}).then( async(response) => {
                    setCardProps(copy_props)
                    console.log("Succesfully ",response);
                })
            });
            console.log("update_frame ")
            setIsSubmit(false)
        } catch (error) {
            setIsSubmit(false)
            console.log("error ",error)
        }
    }
    
    return (
        <ScWelcomePage onSubmit={isSubmit}>
            {isSubmit?
            <div className='loadPage'>
                <span class="loader"><span class="loader-inner"></span></span>
            </div>:""}
            <Navbar/>
                <div className='main'>
                    {cardProps !== undefined ? cardProps.map((item, index) => 
                    <Card pose_name={item.pose_name} image_id={item.image_id} index={index} available_frame_count={item.available_frame_count} isBasket={false} onPick={onPick}/>)
                    : ""}
                </div>
        </ScWelcomePage>
    );
}
export default WelcomePage;