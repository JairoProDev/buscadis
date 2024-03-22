// LoginForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

const Container = styled.form`
  padding: 20px;
  border-radius: 20px;
  border: 8px solid #223243;
  box-shadow: -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.35),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    inset 5px 5px 15px rgba(0, 0, 0, 0.35);
    background: #223243;
`;

const InputBox = styled.div`
  width: 300px;
  position: relative;
  gap: 25px;
`;

const Input = styled.input`
  padding: 12px 10px 12px 48px;
  width: 100%;
  border: none;
  background: #223243;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #fff;
  font-weight: 300;
  border-radius: 25px;
  font-size: 1em;
  box-shadow: -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.35);
  transition: 0.5s;
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
  color: rgba(255, 255, 255, 0.5);
`;

const Icon = styled.i`
  position: absolute;
  top: 15px;
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
  padding: 12px 10px 12px 48px;
  pointer-events: none;
  font-size: 1em;
  font-weight: 300;
  transition: 0.5s;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.5);

  ${Input}:focus + ${Label} &,
  ${Input}:valid + ${Label} & {
    color: #00dfc4;
    border: 1px solid #00dfc4;
    background: #223243;
    transform: translateX(25px) translateY(-7px);
    font-size: 0.6em;
    padding: 0 8px;
    border-radius: 10px;
    letter-spacing: 0.1em;
  }
`;

const Submit = styled.input`
  background: #00dfc4;
  color: #223243;
  padding: 10px 0;
  font-weight: 500;
  cursor: pointer;
  box-shadow: -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.35),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    inset 5px 5px 15px rgba(0, 0, 0, 0.35);
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
      <InputBox>
        <Submit type="submit" value="Entrar a PublicAdis" />
      </InputBox>
    </Container>
  );
}

export default LoginForm;
