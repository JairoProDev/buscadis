// AuthForm.js
import React, { useState } from "react";
import "./authForm.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthForm({ onClose }) {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className={`auth-container ${isLoginForm ? "auth-signinForm" : ""}`}>
      {isLoginForm ? (
        <div className="form-wrapper auth-form auth-signin">
          <LoginForm onClose={onClose} />
        </div>
      ) : (
        <div className="form-wrapper auth-form auth-signup">
          <RegisterForm onClose={onClose} />
        </div>
      )}
      <p>
        {isLoginForm ? "No tienes una cuenta? " : "Ya estudias con nosotros ? "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsLoginForm(!isLoginForm);
          }}
        >
          {isLoginForm ? "Registrate." : "Iniciar Sesión"}
        </a>
      </p>
    </div>
  );
}

export default AuthForm;