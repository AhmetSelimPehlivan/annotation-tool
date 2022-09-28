import ScWelcomePage from './ScWelcomePage';
import Navbar from '../../Components/Navbar';
import Card from '../../Components/Card';
import {string, dict, array} from 'prop-types';
import {ImportJson, GetFrameLengths} from '../../ImportJson';
import { useState, useEffect } from 'react';
import trJson from '../../Assets/trial.json';

const WelcomePage = () => {
const [poseNames, setPoseNames] = useState([])
const [frame, setFrame] = useState()

useEffect (() => {
    let img_json = ImportJson(trJson)
    setPoseNames(img_json.poseNames)
    setFrame(GetFrameLengths(img_json.frameList))
},[]);
    return (
        <ScWelcomePage>
            <Navbar/>
            <div className='main'>    
                <Card poseNames={poseNames} Frames={frame}/>
            </div>
        </ScWelcomePage>
    );
}
WelcomePage.propTypes = {
    importJson: dict
  };
  
WelcomePage.defaultProps = {
    importJson: {}
};
export default WelcomePage;