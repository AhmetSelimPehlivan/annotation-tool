import ScWelcomePage from './ScWelcomePage';
import Navbar from '../../Components/Navbar';
import Card from '../../Components/Card';
import {string, dict, array} from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import Axios from '../../Api/axios'
import { ImportJson } from '../../ImportJson';

const WelcomePage = () => {
    const [cardProps,setCardProps] = useState({})

    useEffect (async () => { console.log("Seria")
    //    ImportJson()
        try {
            await Axios.get('/getImage').then((response) =>{console.log("Serib", response.data)
                setCardProps({image_name: response.data.image_name, poseNames: response.data.poses, frame_count: response.data.frame_count, available_frame_count: response.data.available_frame_count})
            });
        } catch (error) {
            console.log("error ",error)
        }
    },[]);
    const onPick = async (image_Name,pose_name,frame_start,frame_req)=>{
        try { console.log(frame_start,frame_req)
            await Axios.post('/addTask',{
                image_name:  image_Name,
                pose_name:  pose_name,
                frame_interval: [frame_start,(frame_start+frame_req)],
                dedicated_user:  "ASP",
                finished_frame_count:  0,
            }).then((response) =>{console.log("Seric")
                    
            });
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