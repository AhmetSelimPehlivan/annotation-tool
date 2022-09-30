import ScCard from './ScCard';
import { REGION_SHAPE } from '../../Constants';
import { useState, useEffect } from 'react';
import {prototype, string, array, bool} from 'prop-types';

const Card = ({poseNames,Frames, isBasket}) => {
    return (
        <ScCard>
            <p className='image-Name'>Image Name</p>
            <ul className="list">
                {poseNames.map((name,index) => 
                <li className='Pose'>
                    <p className='Pose-Name'>{name}</p>
                    <div className='list-Card'>
                        <div className='card-info'>               
                            <p className='Frame-Count'>{isBasket? "Dedicated": "Available"} Frame: {Frames[index]}</p>
                            <p className='finished-info'>{isBasket? "Finished: 0": ""}</p>
                        </div>
                        <div className='pick-section'>
                            <input type='number' placeholder='0'></input>
                            { isBasket ? <button className='remove-button'>Remove</button>
                            :<button className='pick-button'>Pick</button>}
                        </div>
                    </div>
                </li>
            )}
            </ul>
        </ScCard>
    );
}
Card.propTypes = {
    poseNames: array,
    Frames: array,
    isBasket: bool,
  };
  
Card.defaultProps = {
    poseNames: [],
    Frames: [],
    isBasket: false
};
export default Card;