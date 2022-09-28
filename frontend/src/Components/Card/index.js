import ScCard from './ScCard';
import { REGION_SHAPE } from '../../Constants';
import { useState, useEffect } from 'react';
import {prototype, string, array} from 'prop-types';

const Card = ({poseNames,Frames}) => {
    return (
        <ScCard>
            <p className='image-Name'>Image Name</p>
            <ul className="list">
                {poseNames.map((name,index) => 
                <li className='Pose'>
                    <p className='Pose-Name'>{name}</p>
                    <div className='list-Card'>
                        <p className='Frame-Count'>Available Frame {Frames[index]}</p>
                        <div className='pick-section'>
                            <input type='number' placeholder='0'></input>
                            <button className='pick-button'>Pick</button>
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
  };
  
Card.defaultProps = {
    poseNames: [],
    Frames: [],
};
export default Card;