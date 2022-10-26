import ScCard from './ScCard';
import { useState } from 'react';
import {prototype, string, array, bool, number} from 'prop-types';

const Card = ({task_id, pose_name, image_id, frame_count, available_frame_count, isBasket, onPick}) => {
    const [get_frame, setGet_frame] = useState(0);
    return (
        <ScCard>
            <ul className="list">
                {image_id.map((image_id,index) => available_frame_count[index]<1 ? "":
                <li className='image-list'>
                    {isBasket
                    ?<p className='image-Name'>{pose_name}</p>
                    :<p className='image-Name'>{pose_name[index]}</p>}
                    <div className='Pose'>
                        <p className='Pose-Name'>{image_id}</p>
                        <div className='list-Card'>
                            <div className='card-info'>
                                {isBasket
                                    ?<div className='card-info'>
                                        <p className='Frame-Count'>Dedicated Frame: {available_frame_count.start} - {available_frame_count.end}</p>
                                        <p className='finished-info'>Finished: {frame_count[index]}</p>
                                    </div>
                                    :<div className='card-info'>
                                        <p className='Frame-Count'>Available Frame: {available_frame_count[index]}</p>
                                    </div>
                                }
                            </div>
                            <div className='pick-section'>
                                { isBasket
                                ?<input type='number' placeholder='0' min="1" max={(available_frame_count.end-available_frame_count.start)} onChange={(e)=>{ setGet_frame(e.target.value)}}></input>
                                :<input type='number' placeholder='0' min="1" max={available_frame_count[index]} onChange={(e)=>{ setGet_frame(e.target.value)}}></input>
                                }
                                { isBasket ? <button className='remove-button'  onClick={() => onPick(task_id,pose_name[index],image_id,[available_frame_count.start, available_frame_count.end])}>Remove</button>
                                :<button className='pick-button' onClick={() => onPick(pose_name[index],image_id,index,(frame_count[index]-available_frame_count[index]),get_frame-0)}>Pick</button>}
                            </div>
                        </div>
                    </div>
                </li>
                )}
            </ul>
        </ScCard>
    );
}
Card.propTypes = {
    task_id: number,
    pose_name: string,
    image_id: array,
    frame_count: array,
    available_frame_count: array,
    isBasket: bool,
    onPick: prototype
  };
  
Card.defaultProps = {
    task_id: 0,
    pose_name: "imageName", 
    image_id: [],
    frame_count: [],
    available_frame_count: [],
    isBasket: false,
    onPick: f => f
};
export default Card;