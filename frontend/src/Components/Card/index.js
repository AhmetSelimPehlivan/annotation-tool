import ScCard from './ScCard';
import { useState } from 'react';
import {prototype, string, array, bool} from 'prop-types';

const Card = ({image_Name,poseNames, frame_count, available_frame_count, isBasket, onPick}) => {
    console.log("CARDDDD" ,image_Name,poseNames,frame_count, isBasket,available_frame_count[0].start)
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
                            {isBasket
                                ?<p className='Frame-Count'>Dedicated Frame: {available_frame_count[index].end-available_frame_count[index].start}</p>
                                :<p className='Frame-Count'>Available Frame: {available_frame_count[index]}</p>
                            }
                            <p className='finished-info'>{isBasket? "Finished: ": ""} {frame_count[index]}</p>
                        </div>
                        <div className='pick-section'>
                            <input type='number' placeholder='0' onChange={(e)=>{ setGet_frame(e.target.value)}}></input>
                            { isBasket ? <button className='remove-button'>Remove</button>
                            :<button className='pick-button' onClick={() => onPick(image_Name,pose_name,index,(frame_count[index]-available_frame_count[index]),get_frame-0)}>Pick</button>}
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
    image_Name: "imageName", 
    poseNames: [],
    frame_count: [],
    available_frame_count: [],
    isBasket: false,
    onPick: f => f
};
export default Card;