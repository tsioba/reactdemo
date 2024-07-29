import {auth, provider} from "../config/firebase";
import {signInWithPopup} from "firebase/auth";
import{useNavigate} from "react-router-dom";
import '../style.css';
import GoogleIcon from "./google.svg";

export const Login =()=>{
    const navigate = useNavigate();
    const signINWithGoogle = async ()=>{
       const result = await signInWithPopup(auth, provider);
       console.log(result);
       navigate("/")
    };

    return (
        <div className="login-container">
            <img src={GoogleIcon} alt="Like" width={90} height={90}/>
            <p>Sign in with Google </p>
            <button onClick={signINWithGoogle}>Sign in</button>
        </div>);
};