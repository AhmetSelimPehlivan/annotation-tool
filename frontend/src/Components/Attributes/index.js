import ScAttributes from './ScAttributes';
import {prototype} from 'prop-types';
import { ATTRIBUTE_TYPES } from '../../Constants';
const Attributes = (props) => {
    const {onSelect} = props;
    return (
        <ScAttributes>
            <label>
                <ul>
                    <li><input type="text" placeholder='Name'></input></li>
                    <li><input type="text" placeholder='Definition'></input></li>
                    <li><input type="text" placeholder='Description'></input></li>
                    <li className='drop-down'>
                        <p>Type:</p>
                        <select onChange={(event) => onSelect(event.target.value)}>
                        {ATTRIBUTE_TYPES.map( item => <option value={item.Name}>{item.Name}</option>)}
                        </select>
                    </li>
                    <li className="save_Button"><button onClick={''}>Save</button></li>
                    
                </ul>
            </label>
        </ScAttributes>
    );
}
Attributes.propTypes = {
  onSelect: prototype
};

Attributes.defaultProps = {
  onSelect: f => f
};
export default Attributes;