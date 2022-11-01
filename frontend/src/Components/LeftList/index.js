import ScLeftList from './ScLeftList';
import { REGION_SHAPE } from '../../Constants';
import {prototype, string} from 'prop-types';
import Tool from '../Tool';
import Attributes from '../Attributes';
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