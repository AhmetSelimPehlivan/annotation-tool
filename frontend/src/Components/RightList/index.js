import ScRightList from './ScRightList';
import {prototype, array} from 'prop-types';
import { useMemo } from 'react';

const RightList = ({tasks,onSelect}) => {
    
    const list_item_Renderer = (item) => {
        if (item === undefined) return
        let list_item = []
        for (let i = 0; i < item.end-item.start; i++)
            list_item.push(item.start+i)
        return list_item
    }

    return (
        <ScRightList>
            <ul className="right-List">
               <p className='list-header'>Images</p>
                {tasks.map((task) =>
                    <li className='ImageList'>
                        <p className='ImageName'>{task.pose_name}</p>
                        <ul>
                        {task.image_id.map((image_name,index) => 
                            <li className='Pose'>{image_name}
                                <ul>
                                    {list_item_Renderer(task.frame_interval[index]).map((id) => <li className='Frame' onClick={() => onSelect(task.pose_name,image_name,id)}>Frame {id}</li>)}
                                </ul>
                            </li>
                        )}
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