import {Link} from "react-router-dom";
import {auth} from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";
import '../style.css';
import HomeIcom from "./images/home.svg";
import AddIcon from "./images/add1.svg";
import LogOut from "./images/logout.svg";





export const NavBar =()=>{
    const [user] = useAuthState(auth);
    const signUserOut = async ()=>{
        await signOut(auth);
    }
    return (
    <div className="navbar">
        {!user ? (<Link to={"/login"}><img src={HomeIcom} alt="Like" width={30} height={30}/></Link>) :
            (<>
                <div className="nav-container">
                    <Link to={"/"}><img src={HomeIcom} alt="Like" width={30} height={30}/></Link>
                    <Link to={"/addpost"}><img src={AddIcon} alt="Like" width={32} height={32}/></Link>
                    <button onClick={signUserOut}><img src={LogOut} alt="Like" width={34} height={34}/></button>

                </div>
                <div className="user-info">
                    {user && (
                        <>
                            <p>{user?.displayName}</p>
                            <img src={user?.photoURL || ""} width={"35"} height={"35"}/>
                        </>)}

                </div>
            </>)
        }
    </div>)
};