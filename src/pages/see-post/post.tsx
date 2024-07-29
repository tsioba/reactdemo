import React, { useState, useEffect } from 'react';
import { Post as IPost } from './main';
import '../../style.css';
import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import LikeIcon from './images/like-icon.svg';
import DeleteIcon from './images/delete.svg';
import DeletePostModal from './DeletePostModal';

interface Props {
    post: IPost;
}

interface Like {
    userId: string;
    id: string;
}

export const Post: React.FC<Props> = (props) => {
    const { post } = props;
    const [user] = useAuthState(auth);
    const [likes, setLikes] = useState<Like[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const postRef = doc(db, 'posts', post.id);
    const likesRef = collection(db, 'likes');
    const likesQuery = query(likesRef, where('postId', '==', post.id));

    const getLikes = async () => {
        const data = await getDocs(likesQuery);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, id: doc.id })));
    };

    const toggleLike = async () => {
        if (user) {
            const likeToDelete = likes.find((like) => like.userId === user.uid);
            if (likeToDelete) {
                await deleteDoc(doc(db, 'likes', likeToDelete.id));
            } else {
                await addDoc(likesRef, { userId: user.uid, postId: post.id });
            }
            getLikes();
        } else {
            console.log('User is not authenticated.');
        }
    };

    const deletePost = async () => {
        if (user && user.uid === post.userId) {
            try {
                await deleteDoc(postRef);
                console.log('Post deleted successfully');
                setModalIsOpen(false); // Κλείσιμο του modal
                // Ανανεώνει την λίστα με τα posts
                window.location.reload();
            } catch (error) {
                console.error('Error deleting post: ', error);
            }
        } else {
            console.log('You are not authorized to delete this post');
        }
    };

    useEffect(() => {
        getLikes();
    }, [post.id]);

    const hasUserLiked = likes.some((like) => like.userId === user?.uid);

    return (
        <div className="post-container">
            <div className="user-info">
                <img src={post?.userphoto || ''} width={'20'} height={'20'} alt="User" />
                <p>{post?.username}</p>
                {user?.uid === post.userId && (
                    <>
                        <button onClick={() => setModalIsOpen(true)}>
                            <img src={DeleteIcon} alt="Delete" width={20} height={20} />
                        </button>
                        <DeletePostModal
                            isOpen={modalIsOpen}
                            onRequestClose={() => setModalIsOpen(false)}
                            onDelete={deletePost}
                        />
                    </>
                )}
            </div>
            <div className="title">
                <h2>{post.title}</h2>
            </div>
            <div className="description">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <button
                    className={`like-button ${hasUserLiked ? 'liked' : 'not-liked'}`}
                    onClick={toggleLike}
                >
                    <img src={LikeIcon} alt="Like" width={20} height={20} />
                </button>
                <p>Likes: {likes.length}</p>
            </div>
        </div>
    );
};
