import ScCard from './ScCard';
import { useState, useEffect } from 'react';
import {prototype, string, array, bool} from 'prop-types';

const Card = ({image_Name,poseNames, frame_count, available_frame_count, isBasket, onPick}) => {
    console.log("CARDDDDd" ,image_Name,poseNames,frame_count, isBasket)
    const [get_frame, setGet_frame] = useState(0);
    return (
        <ScCard>
            <p className='image-Name'>{image_Name}</p>
            <ul className="list">
                {poseNames.map((pose_name,index) => 
                <li className='Pose'>
                    <p className='Pose-Name'>{pose_name}</p>
                    <div className='list-Card'>
                        <div className='card-info'>               
                            <p className='Frame-Count'>{isBasket? "Dedicated": "Available"} Frame: {available_frame_count[index]}</p>
                            <p className='finished-info'>{isBasket? "Finished: 0": ""}</p>
                        </div>
                        <div className='pick-section'>
                            <input type='number' placeholder='0' onChange={(e)=>{ setGet_frame(e.target.value)}}></input>
                            { isBasket ? <button className='remove-button'>Remove</button>
                            :<button className='pick-button' onClick={() => onPick(image_Name,pose_name,(frame_count[index]-available_frame_count[index]),get_frame-0)}>Pick</button>}
                        </div>
                    </div>
                </li>
            )}
            </ul>
        </ScCard>
    );
}
Card.propTypes = {
    image_Name: string,
    poseNames: array,
    frame_count: array,
    available_frame_count: array,
    isBasket: bool,
    onPick: prototype
  };
  
Card.defaultProps = {
    image_Name: "Image Name", 
    poseNames: [],
    frame_count: [],
    available_frame_count: [],
    isBasket: false,
    onPick: f => f
};
export default Card;