import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const handDemoSubmit = async (e) => {
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      console.log(data)
      setErrors(data);
    } else {
      closeModal();
    }

  }

  return (
    <div className="login-form-div">
      <form className="login-form" onSubmit={handleSubmit}>
      <h2>Log In</h2>
        <label className="login-email-label">
          Email
          <input
            className="login-email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className='login-password-label'>
          Password
          <input
            className="login-password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="submit-login-button" type="submit">Log In</button>
      </form>
        <button className="demo-login-button" onClick={handDemoSubmit}>Demo User</button>
        {errors && errors["email"] && (
        <p className="p-error">{errors["email"]}</p>
      )}
      {errors && errors["password"] && (
        <p className="p-error">{errors["password"]}</p>
      )}
    </div>
  );
}

export default LoginFormModal;