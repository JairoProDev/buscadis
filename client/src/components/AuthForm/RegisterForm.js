// RegisterForm.js
import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  padding: 20px;
  border-radius: 20px;
  border: 8px solid #223243;
  box-shadow: -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.35),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    inset 5px 5px 15px rgba(0, 0, 0, 0.35);
  background: #223243;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
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
  top: 12px;
  left: 16px;
  width: 25px;
  padding: 2px 0;
  padding-right: 8px;
  color: #00dfc4;
  border-right: 1px solid #00dfc4;
`;

const Span = styled.span`
  position: absolute;
  left: 40;
  padding: 0px 10px 12px 0px;
  pointer-events: none;
  font-size: 1em;
  font-weight: 300;
  transition: 0.5s;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.5);
  width: 223px;

  ${Input}:focus + ${Label} &,
  ${Input}:valid + ${Label} & {
    color: #00dfc4;
    left: 0;
    border: 1px solid #00dfc4;
    background: #223243;
    transform: translateX(25px) translateY(-20px);
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

const Error = styled.div`
  color: red;
  font-size: 0.75em;
  font-weight: 300;
  margin-top: -25px;
`;

const Title = styled.h2`
  color: #ffffff;
`;

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
console.log({
  firstName,
  lastName,
  userName,
  phoneNumber,
  email,
  password,
});

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          userName,
          phoneNumber,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        // Aquí puedes redirigir al usuario a la página de inicio de sesión
        // Por ejemplo, puedes usar react-router-dom para hacer esto
        // history.push('/login');
      } else {
        console.log(data);
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Registrate:</Title>
        <InputBox>
          <Input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Label>
            <Span>Nombres:</Span>
          </Label>
          <Icon>
            <FontAwesomeIcon icon={faUser} />
          </Icon>
        </InputBox>
        <InputBox>
          <Input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Label>
            <Span>Apellidos:</Span>
          </Label>
          <Icon>
            <FontAwesomeIcon icon={faUser} />
          </Icon>
        </InputBox>
        <InputBox>
          <Input
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Label>
            <Span>Nombre de usuario:</Span>
          </Label>
          <Icon>
            <FontAwesomeIcon icon={faUser} />
          </Icon>
        </InputBox>
        <InputBox>
          <Input
            type="text"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Label>
            <Span>N° Celular:</Span>
          </Label>
          <Icon>
            <FontAwesomeIcon icon={faPhone} />
          </Icon>
        </InputBox>
        <InputBox>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>
            <Span>Correo Electrónico:</Span>
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
            <Span>Crea tu contraseña:</Span>
          </Label>
          <Icon>
            <FontAwesomeIcon icon={faLock} />
          </Icon>
        </InputBox>
        <InputBox>
          <Input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Label>
            <Span>Confirma tu contraseña:</Span>
          </Label>
          <Icon>
            <FontAwesomeIcon icon={faLock} />
          </Icon>
        </InputBox>
        <InputBox>
          <Submit type="submit" value="Crear cuenta" />
        </InputBox>
      </Form>
      {error && <Error>{error}</Error>}
    </Container>
  );
}

export default RegisterForm;
