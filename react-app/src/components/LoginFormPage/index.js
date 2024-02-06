import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="login-form-div">
     
      <form className="login-form" onSubmit={handleSubmit}>
      <h2>Log In</h2>
        <ul>
          {errors.map((error, idx) => (
            <li className="errors-p" key={idx}>{error}</li>
          ))}
        </ul>
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
    </div>
  );
}

export default LoginFormPage;