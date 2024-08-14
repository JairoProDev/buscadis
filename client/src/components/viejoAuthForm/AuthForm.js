import React, { useState } from "react";
import "./authForm.css";
import Login from "./Login";   // Cambia el nombre de la importación a Login
import Register from "./Register"; // Cambia el nombre de la importación a Register

function AuthForm() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className={`auth-container ${isLoginForm ? "auth-signinForm" : ""}`}>
      {isLoginForm ? (
        <div className="form-wrapper auth-form auth-signin">
          <Login /> {/* Utiliza Login en lugar de LoginForm */}
        </div>
      ) : (
        <div className="form-wrapper auth-form auth-signup">
          <Register /> {/* Utiliza Register en lugar de RegisterForm */}
        </div>
      )}
      <p>
        {isLoginForm ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
        <button
          type="button"
          className="toggle-auth-form"
          onClick={() => setIsLoginForm(!isLoginForm)}
        >
          {isLoginForm ? "Regístrate." : "Inicia Sesión"}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;