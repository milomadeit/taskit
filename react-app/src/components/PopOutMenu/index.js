import React, { useState, useRef, useEffect } from 'react';
import './PopOut.css'

function useOutsideAlerter(ref, onClose) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, onClose]);
}

function PopOutMenu({ children }) {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const menuRef = useRef(null);
    useOutsideAlerter(menuRef, () => setIsVisible(false));

    return (
        <div className="popout-menu-container" ref={menuRef}>
            <button className='togggle-pop-out-button' onClick={toggleVisibility}>⋮</button>
            {isVisible && (
                <div className="popout-menu">
                    {children}
                </div>
            )}
        </div>
    );
}

export default PopOutMenu;
