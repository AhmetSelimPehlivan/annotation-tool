import ScRightList from './ScRightList';
import {prototype, array} from 'prop-types';
import { useCallback } from 'react';

const RightList = ({tasks,onSelect}) => {
    
    const list_item_Renderer = useCallback((item) => {
        if (item === undefined) return
        let list_item = []
        for (let i = 0; i < item.end-item.start; i++)
            list_item.push(item.start+i)
        return list_item
    })
    return (
        <ScRightList>
            <ul className="right-List">
               <p className='list-header'>Images</p>
                {tasks.map((task) =>
                    <li className='ImageList'>
                        <p className='Pose'>{task.pose_name}</p>
                        <p className='TaskNumber'>Task {task._id}</p>
                        <ul>
                            {list_item_Renderer(task.frame_interval).map((id) => <li className='Frame' onClick={() => onSelect(task._id,id)}>Frame {id}</li>)}
                        </ul>
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