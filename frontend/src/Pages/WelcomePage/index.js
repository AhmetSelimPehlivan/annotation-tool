import { useState, useEffect, useCallback } from 'react';
import {dict} from 'prop-types';
import io from 'socket.io-client'
import { useSelector } from 'react-redux'
import ScWelcomePage from './ScWelcomePage';
import Navbar from '../../Components/Navbar';
import Card from '../../Components/Card';
import { selectCurrentUser } from '../../Api/Redux/authReducer';
import Axios from '../../Api/axios'
//import { ImportJson } from '../../ImportJson';

const WelcomePage = () => {
    const socket = io("http://localhost:3001/")
    const userName = useSelector(selectCurrentUser)
    const [cardProps,setCardProps] = useState({})

    socket.on("recieve-available_frame_count", message =>{
        console.log(`You available_frame_count :, ${message}`)
        setCardProps(prevProps => ({...prevProps, available_frame_count: message})) 
    })
    useEffect(() => {
        //    ImportJson()
        async function fetchData(){
            try {
                await Axios.get('/getImage').then((response) =>{
                    setCardProps({image_name: response.data.image_name, poseNames: response.data.poses, frame_count: response.data.frame_count, available_frame_count: response.data.available_frame_count})
                });
            } catch (error) {
                console.log("error ",error)
            }
        }
        fetchData()
        socket.on("connect", ()=>{
            console.log(`You connected :, ${socket.id}`)
        })
    },[]);

    const onPick = async (image_Name,pose_name,pose_index,frame_start,frame_req)=>{
        try { console.log(frame_start,frame_req)
            await Axios.post('/addTask',{
                image_name:  image_Name,
                pose_name:  pose_name,
                pose_index: pose_index,
                frame_interval: {start:frame_start, end:(frame_start+frame_req)},
                dedicated_user:  userName,
                finished_frame_count:  0,
            }).then( async () =>{console.log("Seric",image_Name)
               await Axios.post('/update_frame',{
                    image_name:  image_Name,
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
                <Card name={cardProps.image_name} poseNames={cardProps.poseNames} frame_count={cardProps.frame_count} available_frame_count={cardProps.available_frame_count} isBasket={false} onPick={onPick}/>
            </div>
        </ScWelcomePage>
    );
}
WelcomePage.propTypes = {
    importJson: dict
  };
  
WelcomePage.defaultProps = {
    importJson: {}
};
export default WelcomePage;