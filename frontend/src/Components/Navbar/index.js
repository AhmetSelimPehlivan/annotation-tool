import ScNavbar from './ScNavbar';
const Navbar = () => {
    const fileSelectedHandler = event =>{
        console.log("Event ", event)
    }
    return (
        <ScNavbar>
            <ul>
                <li onClick={""}>Project</li>
                <li onClick={""}>Save</li>
                <li onClick={""}>Import</li>
                <li onClick={""}>Export</li>
                <li>
                <label for="file-upload" class="file-upload" onChange={fileSelectedHandler}>
                    Load Image
                </label>
                <input id="file-upload" type="file" onChange={fileSelectedHandler}/>
                </li>
                <li onClick={""}>Settings</li>
            </ul>
        </ScNavbar>
    );
}
export default Navbar;