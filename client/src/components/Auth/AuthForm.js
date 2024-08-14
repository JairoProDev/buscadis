import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";
import LoginForm from "./Login";
import RegisterForm from "./Register";

function AuthForm({ isLoginForm }) {
  const [isLogin, setIsLogin] = useState(isLoginForm);
  const navigate = useNavigate();

  const handleToggle = () => {
    if (isLogin) {
      navigate('/auth/register');
    } else {
      navigate('/auth/login');
    }
    setIsLogin(!isLogin);
  };

  return (
    <div className={`auth-container ${isLogin ? "auth-signinForm" : ""}`}>
      {isLogin ? (
        <div className="form-wrapper auth-form auth-signin">
          <LoginForm />
        </div>
      ) : (
        <div className="form-wrapper auth-form auth-signup">
          <RegisterForm />
        </div>
      )}
      <p>
        {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
        <button
          type="button"
          className="toggle-auth-form"
          onClick={handleToggle}
        >
          {isLogin ? "Regístrate." : "Inicia Sesión"}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;
