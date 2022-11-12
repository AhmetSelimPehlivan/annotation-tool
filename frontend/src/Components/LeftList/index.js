import Tool from '../Tool';
import ScLeftList from './ScLeftList';
import { REGION_SHAPE } from '../../Constants';
import {prototype, string} from 'prop-types';
import { ATTRIBUTE_KEYPOINTS, ATTRIBUTE_COLORS } from '../../Constants/attributeTypes';
const LeftList = ({onSelect, selectedTool, onSelectedType}) => {
    return (
        <ScLeftList>
            <ul className="list">
               <li>
                    <p className="list-header">Tools</p>
                    <div className='shape-tools'>
                        {REGION_SHAPE.map(item => <Tool name={item.Name} icon={item.Icon} onSelect={onSelect} isSelected={selectedTool==item.Name}/>)}
                    </div>
               </li>
               <li>
                    <p className="list-header">Keypoint List</p>
                    <div className='keypoint-div'>
                        <ul className='keypoint-list'>
                        {ATTRIBUTE_KEYPOINTS.map((keypoint,list_index) =>
                            <li className='keypoint-item' style={{'color': ATTRIBUTE_COLORS[list_index>0 ? Math.ceil(list_index/6) : list_index]}}>{list_index+1} - {keypoint}</li>
                        )}
                        </ul>
                    </div>
               </li>
            </ul>
        </ScLeftList>
    );
}
LeftList.propTypes = {
    onSelect: prototype,
    selectedTool: string
  };
  
LeftList.defaultProps = {
    onSelect: f => f,
    selectedTool: ""
};
export default LeftList;