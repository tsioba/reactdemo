import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import '../../style.css';
import { useNavigate } from 'react-router-dom';
import Add from "./add2.svg";


interface CreateFormData {
    title: string;
    description: string;
}

export const CreateForm = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        description: yup.string().required("You must add a description."),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const postsRef = collection(db, "posts");
    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            title: data.title,
            description: data.description,
            username: user?.displayName,
            userId: user?.uid,
            userphoto:user?.photoURL
        });
        reset();
        navigate('/');
    };

    if (!user) {
        return <p>You must be logged in to create a post.</p>;
    }

    return (
        <form onSubmit={handleSubmit(onCreatePost)} className="create-form">
            <input type={"text"} placeholder="Title..." {...register("title")} />
            <p className="error-message">{errors.title?.message}</p>
            <textarea placeholder="Description..." {...register("description")} />
            <p className="error-message">{errors.description?.message}</p>
            <button type="submit" className="submit-button">
                <img src={Add} alt="add" width={35} height={35}/>
            </button>
        </form>
    );
};
