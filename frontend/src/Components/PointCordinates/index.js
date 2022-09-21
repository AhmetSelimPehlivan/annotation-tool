import ScPointCordinates from './ScPointCordinates';
const PointCordinates = () => {
    return (
        <ScPointCordinates>
            <ul>
                <li><p>Start X:</p> <input type="number" step="0.01"></input></li>
                <li><p>Start Y:</p> <input type="number" step="0.01"></input></li>
                <li><p>End X:</p> <input type="number" step="0.01"></input></li>
                <li><p>End Y:</p> <input type="number" step="0.01"></input></li>
            </ul>
        </ScPointCordinates>
    );
}
export default PointCordinates;