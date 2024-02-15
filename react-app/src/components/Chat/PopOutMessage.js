import React, { useState, useRef, useEffect } from 'react';
import './PopOutMessage.css'
import { useSelector } from 'react-redux';


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

function PopOutMessage({ children }) {
	const user = useSelector((state) => state.session.user)
	const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const menuRef = useRef(null);
    useOutsideAlerter(menuRef, () => setIsVisible(false));

    // Adjusted return statement to always render children but control visibility with a class
    return (
		<div>
			{!user ? (<></>): (
				<div className="popout-message-container" ref={menuRef}>
					<i onClick={toggleVisibility} className="fa-solid fa-message fa-2xl"></i>
					<div className={`popout-message ${isVisible ? 'visible' : 'hidden'}`}>
						{children}
					</div>
				</div>
	
	
			)}
		</div>
    );
}

export default PopOutMessage;
