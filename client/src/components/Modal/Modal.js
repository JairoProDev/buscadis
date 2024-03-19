import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ children, onClose }) {
    return ReactDOM.createPortal(
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <button onClick={onClose}>Cerrar</button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    width: '80%',
    height: '80%',
    padding: '20px',
};

export default Modal;