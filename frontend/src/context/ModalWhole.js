import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './ModalWhole.css';

const ModalWholeContext = createContext();

export function ModalWholeProvider({ children }) {
    const modalRef = useRef(null);
    const [valueWhole, setValueWhole] = useState(null);

    useEffect(() => {
        setValueWhole(modalRef.current);
    }, []);

    return (
        <>
            <ModalWholeContext.Provider value={valueWhole}>
                {children}
            </ModalWholeContext.Provider>
            <div ref={modalRef} className='modalWhole-wrapper'></div>
        </>
    )
};

export function ModalWhole({ onClose, children }) {
    const modalNode = useContext(ModalWholeContext);
    // console.log('modalNode', modalNode);
    if (!modalNode) return null;

    // createPortal(children, container)
    return ReactDOM.createPortal(
        <div id='modalWhole'>
            <div id='modalWhole-background' onClick={onClose} />
            <div id='modalWhole-content'>
                {children}
            </div>
        </div>,
        modalNode
    )
}