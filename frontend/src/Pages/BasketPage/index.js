import ScBasketPage from './ScBasketPage';
import Navbar from '../../Components/Navbar';
import Card from '../../Components/Card';
import {string, dict, array} from 'prop-types';
import {ImportJson, GetFrameLengths} from '../../ImportJson';
import { useState, useEffect } from 'react';
import trJson from '../../Assets/trial.json';

const BasketPage = () => {
const [poseNames, setPoseNames] = useState([])
const [frame, setFrame] = useState()

useEffect (() => {
    let img_json = ImportJson(trJson)
    setPoseNames(img_json.poseNames)
    setFrame(GetFrameLengths(img_json.frameList))
},[]);
    return (
        <ScBasketPage>
            <Navbar/>
            <div className='main'>    
                <Card poseNames={poseNames} Frames={frame} isBasket={true}/>
            </div>
        </ScBasketPage>
    );
}
BasketPage.propTypes = {
    importJson: dict
  };
  
BasketPage.defaultProps = {
    importJson: {}
};
export default BasketPage;