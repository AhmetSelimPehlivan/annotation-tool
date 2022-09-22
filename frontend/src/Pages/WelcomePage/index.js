import ScWelcomePage from './ScWelcomePage';
import Navbar from '../../Components/Navbar';
import Canvas from '../../Components/Canvas';
import LeftList from '../../Components/LeftList';
import RightList from '../../Components/RightList';
import ImportJson from '../../ImportJson';
import imge from '../../Assets/yoga.jpg'
import trJson from '../../Assets/trial.json'
import { useState } from 'react';

const WelcomePage = () => {
const [selectedTool, setselectedTool] = useState("");
const [selectedType, setselectedType] = useState("");
const [imageWindow, setimageWindow] = useState({});
const [frames, setFrames] = useState([])
const [poseNames, setPoseNames] = useState([])

const onImgLoad = ({ target: img }) => {
    const { offsetHeight, offsetWidth } = img;
    setimageWindow({ offsetHeight, offsetWidth })
  };
const loadJson = () => {
    let pose = ImportJson(trJson)
    setPoseNames(pose.poseNames)
    setFrames(pose.frameList)
}
const onSelectedFrame = () =>{
    console.log("Meta")
}
    return (
        <>
        <Navbar onLoadJson={loadJson}/>
        <ScWelcomePage>
            <LeftList  
                onSelect={(tool) => {setselectedTool(tool)}} 
                selectedTool={selectedTool}
                onSelectedType={(type) => {setselectedType(type)}} />
            <div className="main">
                <img
                className="Image"
                id='IMG'
                src={imge}
                onLoad={onImgLoad}
                ></img>
                <Canvas window_size={imageWindow} selectedTool={selectedTool} selectedType={selectedType}/>
            </div>
            <RightList PoseNames={poseNames} Frames={frames} onSelect={onSelectedFrame}/>
        </ScWelcomePage>
        </>
    );
}
export default WelcomePage;