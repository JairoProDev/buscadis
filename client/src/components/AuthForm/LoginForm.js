// LoginForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

const Container = styled.form`
  padding: 20px;
  border-radius: 20px;
  border: none;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  background: #ecf0f3;
`;

const InputBox = styled.div`
  width: 300px;
  position: relative;
  gap: 25px;
  margin: 10px 0;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 12px 10px 12px 48px;
  width: 100%;
  border: none;
  background: #ecf0f3;
  color: #181818;
  font-weight: 300;
  border-radius: 8px;
  font-size: 13px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
  transition: 0.25s ease;
  outline: none;
`;

const Label = styled.label`
  position: absolute;
  left: 0;
  padding: 12px 10px 12px 48px;
  pointer-events: none;
  font-size: 1em;
  font-weight: 300;
  transition: 0.5s;
  letter-spacing: 0.05em;
  color: #a0a5a8;
`;

const Icon = styled.i`
  position: absolute;
  top: 8px;
  left: 16px;
  width: 25px;
  padding: 2px 0;
  padding-right: 8px;
  color: #00dfc4;
  border-right: 1px solid #00dfc4;
`;

const Span = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  padding: 12px 10px 12px 48px;
  pointer-events: none;
  font-size: 1em;
  font-weight: 300;
  transition: 0.5s;
  letter-spacing: 0.05em;
  color: #a0a5a8;
  width: 225px;

  ${Input}:focus + ${Label} &,
  ${Input}:valid + ${Label} & {
    color: #00dfc4;
    border: 1px solid #00dfc4;
    background: #ecf0f3;
    transform: translateX(25px) translateY(-7px);
    font-size: 0.6em;
    padding: 0 8px;
    border-radius: 10px;
    letter-spacing: 0.1em;
  }
`;

const Submit = styled.button`
  width: 180px;
  border-radius: 25px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: #4b70e2;
  color: #f9f9f9;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
  border: none;
  outline: none;
`;

function LoginForm({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
        onClose();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <h2>Inicia sesión:</h2>
      <InputBox>
        <Input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label>
          <Span>Correo Electronico:</Span>
        </Label>
        <Icon>
          <FontAwesomeIcon icon={faEnvelope} />
        </Icon>
      </InputBox>
      <InputBox>
        <Input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Label>
          <Span>Contraseña:</Span>
        </Label>
        <Icon>
          <FontAwesomeIcon icon={faKey} />
        </Icon>
      </InputBox>
      <Submit type="submit">Entrar a PublicAdis</Submit>
    </Container>
  );
}

export default LoginForm;
