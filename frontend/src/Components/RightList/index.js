import ScRightList from './ScRightList';
import {prototype, array} from 'prop-types';
import { useMemo } from 'react';

const RightList = ({PoseNames,frame_interval,onSelect}) => {
    
    const list_item_Renderer = (item) => { console.log("AAA")
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
               <li className='ImageList'>
                    <p className='ImageName'>Image Name</p>
                    <ul>
                        {PoseNames.map((name,index) => 
                            <li className='Pose'>{name}
                                <ul>
                                    {list_item_Renderer(frame_interval[index]).map((id) => 
                                        <li className='Frame' onClick={() => onSelect(index,id)}>Frame {id}</li>)}
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
    frame_interval: array,
    onSelect: prototype
  };
  
RightList.defaultProps = {
    PoseNames: [],
    frame_interval: [],
    onSelect: f => f
};
export default RightList;