import ScWelcomePage from './ScWelcomePage';
import Navbar from '../../Components/Navbar';
import Canvas from '../../Components/Canvas';
import LeftList from '../../Components/LeftList';
import RightList from '../../Components/RightList';
import imge from '../../Assets/yoga.jpg'
import { useState } from 'react';

const WelcomePage = () => {
const [selectedTool, setselectedTool] = useState("");
const [selectedType, setselectedType] = useState("");
const [imageWindow, setimageWindow] = useState({});
const onImgLoad = ({ target: img }) => {
    const { offsetHeight, offsetWidth } = img;
    setimageWindow({ offsetHeight, offsetWidth })
  };

  console.log(selectedTool)
    return (
        <>
        <Navbar/>
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
            <RightList />
        </ScWelcomePage>
        </>
    );
}
export default WelcomePage;