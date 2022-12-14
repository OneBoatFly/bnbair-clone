import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = createContext();

export function ModalProvider({children}) {
    const modalRef = useRef(null);
    const [value, setValue] = useState(null);

    useEffect(() => {
      setValue(modalRef.current);
    }, []);

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} className='modal-wrapper'></div>
        </>
    )
};

export function Modal({ onClose, children }) {
    const modalNode = useContext(ModalContext);
    // console.log('modalNode', modalNode);
    if (!modalNode) return null;

    // createPortal(children, container)
    return ReactDOM.createPortal(
        <div id='modal'>
            <div id='modal-background' onClick={onClose} />
            <div id='modal-content'>
                {children}
            </div>
        </div>,
        modalNode
    )
}