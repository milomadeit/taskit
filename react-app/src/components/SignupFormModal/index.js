import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="main-signup-div">

		<div className="signup-modal-container">
			<h1 className="signup-title">Sign Up</h1>
			<form className="signup-form" onSubmit={handleSubmit}>
			<ul className="signup-errors">
				{errors.map((error, idx) => (
					<li className="signup-error" key={idx}>{error}</li>
				))}
			</ul>
				<div className="signup-field">
					<label className="signup-label">
						Email
						<input
							className="signup-input"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="signup-field">
					<label className="signup-label">
						Username
						<input
							className="signup-input"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="signup-field">
					<label className="signup-label">
						Password
						<input
							className="signup-input"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="signup-field">
					<label className="signup-label">
						Confirm Password
						<input
							className="signup-input"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<button className="signup-submit-button" type="submit">Sign Up</button>
			</form>
		</div>
		</div>

	);
}

export default SignupFormModal;