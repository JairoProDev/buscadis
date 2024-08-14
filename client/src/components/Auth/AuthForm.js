import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AuthForm.css";
import LoginForm from "./Login";
import RegisterForm from "./Register";

function AuthForm() {
  const location = useLocation();  // Usamos useLocation para detectar cambios en la URL
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Actualiza el estado según la ruta actual
    if (location.pathname === '/auth/login') {
      setIsLoginForm(true);
    } else if (location.pathname === '/auth/register') {
      setIsLoginForm(false);
    }
  }, [location]);

  const handleToggle = () => {
    if (isLoginForm) {
      navigate('/auth/register');
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <div className={`auth-container ${isLoginForm ? "auth-signinForm" : ""}`}>
      {isLoginForm ? (
        <div className="form-wrapper auth-form auth-signin">
          <LoginForm />
        </div>
      ) : (
        <div className="form-wrapper auth-form auth-signup">
          <RegisterForm />
        </div>
      )}
      <p>
        {isLoginForm ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
        <button
          type="button"
          className="toggle-auth-form"
          onClick={handleToggle}
        >
          {isLoginForm ? "Regístrate." : "Inicia Sesión"}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;
