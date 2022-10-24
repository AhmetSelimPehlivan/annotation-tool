import ScRightList from './ScRightList';
import {prototype, array} from 'prop-types';

const RightList = ({tasks,onSelect}) => {
    return (
        <ScRightList>
            <ul className="right-List">
               <p className='list-header'>Images</p>
                {tasks.map((task) =>
                    <li className='ImageList' onClick={() => onSelect(task._id)}>
                        <p className='Pose'>{task.pose_name}</p>
                        <p className='Frame'>Frame Count {task.frames.length}</p>
                    </li>
                )}
            </ul>
        </ScRightList>
    );
}
RightList.propTypes = {
    tasks: array,
    imageID: array,
    frame_interval: array,
    pose_name: array,
    onSelect: prototype
  };
  
RightList.defaultProps = {
    tasks: [],
    imageID: [],
    frame_interval: [],
    pose_name: [],
    onSelect: f => f
};
export default RightList;