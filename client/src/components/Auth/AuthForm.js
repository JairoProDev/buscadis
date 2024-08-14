import React, { useState } from "react";
import "./AuthForm.css";
import LoginForm from "./Login";
import RegisterForm from "./Register";

function AuthForm() {  // Corrige cualquier posible error de importación
  const [isLoginForm, setIsLoginForm] = useState(true);

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
          onClick={() => setIsLoginForm(!isLoginForm)}
        >
          {isLoginForm ? "Regístrate." : "Inicia Sesión"}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;