import ScTool from './ScTool';
import {string, bool, prototype} from 'prop-types';
const Tool = (props) => {
const {name, icon, onSelect, isSelected} = props;
    return (
        <ScTool isSelected={isSelected}>
            <input onClick={() => onSelect(name)} type="image" className="tool-button" src={icon} alt={name}/>
        </ScTool>
    );
}
Tool.propTypes = {
  name: string,
  icon: prototype,
  isSelected: bool,
  onSelect: prototype
};

Tool.defaultProps = {
  name: "",
  icon: null,
  isSelected: false,
  onSelect: f => f
};
export default Tool;