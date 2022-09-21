import ScRightList from './ScRightList';
import {prototype, string} from 'prop-types';

const RightList = ({}) => {
    return (
        <ScRightList>
            <ul className="right-List">
               <p className='list-header'>Images</p>
               {}
               <li>
                    <img className='preview'>
                    </img>
                    <p>Image Number</p>
               </li>
            </ul>
        </ScRightList>
    );
}
RightList.propTypes = {
  };
  
RightList.defaultProps = {
};
export default RightList;