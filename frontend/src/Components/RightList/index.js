import ScRightList from './ScRightList';
import {prototype, array} from 'prop-types';

const RightList = ({PoseNames,Frames,onSelect}) => {
    return (
        <ScRightList>
            <ul className="right-List">
               <p className='list-header'>Images</p>
               <li className='ImageList'>
                    <p className='ImageName'>Image Name</p>
                    <ul>
                        {PoseNames.map((name,index) => 
                            <li className='Pose'>{name}
                                <ul>
                                    {Frames[index].map((id) => <li className='Frame' onClick={onSelect}>Frame {id}</li>)}
                                </ul>
                            </li>
                        )}
                    </ul>
               </li>
            </ul>
        </ScRightList>
    );
}
RightList.propTypes = {
    PoseNames: array,
    Frames: array,
    onSelect: prototype
  };
  
RightList.defaultProps = {
    PoseNames: [],
    Frames: [],
    onSelect: f => f
};
export default RightList;