import React, { useEffect } from 'react';
import Modal from 'react-modal';
import '../../style.css';

Modal.setAppElement('#root'); // Ορίζει το root element για προσβασιμότητα

interface DeletePostModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onDelete: () => void;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({ isOpen, onRequestClose, onDelete }) => {
    useEffect(() => {
        if (isOpen) {
            // Απενεργοποίηση scrolling στο body
            document.body.classList.add('no-scroll');
        } else {
            // Επαναφορά scrolling στο body
            document.body.classList.remove('no-scroll');
        }
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirm Delete"
            className="modal"
            overlayClassName="modal-overlay"
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
        >
            <h2>Are you sure you want to delete this post?</h2>
            <div>
                <button onClick={onDelete}>Delete</button>
                <button className="cancel" onClick={onRequestClose}>Cancel</button>
            </div>
        </Modal>
    );
};

export default DeletePostModal;
