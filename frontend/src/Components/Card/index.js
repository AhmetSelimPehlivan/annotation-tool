import ScCard from './ScCard';
import { useState } from 'react';
import {prototype, string, array, bool, number} from 'prop-types';

const Card = ({task_id, pose_name, image_id, index, frame_count, available_frame_count, isBasket, onPick}) => {
    const [get_frame, setGet_frame] = useState(0);
    console.log("ASd")
    console.log("available_frame_count ",available_frame_count)
    return (
        <ScCard>
            <ul className="list">
                {available_frame_count<1 ? "":
                <li className='image-list'>
                    <p className='image-Name'>{pose_name}</p>
                    <div className='Pose'>
                        <p className='Pose-Name'>{image_id}</p>
                        <div className='list-Card'>
                            <div className='card-info'>
                                {isBasket
                                    ?<div className='card-info'>
                                        <p className='Frame-Count'>Dedicated Frame: {available_frame_count.reduce((accumulator, value) => {return accumulator + (value[1]-value[0])}, 0)}</p>
                                        <p className='finished-info'>Finished: {frame_count}</p>
                                    </div>
                                    :<div className='card-info'>
                                        <p className='Frame-Count'>Available Frame: {available_frame_count}</p>
                                    </div>
                                }
                            </div>
                            <div className='pick-section'>
                                { isBasket ? <button className='remove-button'  onClick={() => onPick(task_id,pose_name,image_id,available_frame_count)}>Remove</button>
                                :<>
                                    <input type='number' placeholder='0' min="1" max={available_frame_count} onChange={(e)=>{ setGet_frame(e.target.value)}}></input>
                                    <button className='pick-button' onClick={() => onPick(pose_name,image_id,index,get_frame-0)}>Pick</button>
                                </>}
                            </div>
                        </div>
                    </div>
                </li>}
            </ul>
        </ScCard>
    );
}
Card.propTypes = {
    task_id: number,
    index: number,
    pose_name: string,
    image_id: array,
    frame_count: array,
    available_frame_count: array,
    isBasket: bool,
    onPick: prototype
  };
  
Card.defaultProps = {
    task_id: 0,
    index: 0,
    pose_name: "imageName", 
    image_id: [],
    frame_count: [],
    available_frame_count: [],
    isBasket: false,
    onPick: f => f
};
export default Card;