import React, { useState } from 'react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        console.log('La función handleSubmit se está ejecutando');
        console.log('Correo electrónico:', email);
        console.log('Contraseña:', password);
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Guarda el token en el almacenamiento local del navegador
                localStorage.setItem('token', data.token);
                // Redirige al usuario a la página principal
                // history.push('/');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Correo electrónico:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Iniciar sesión</button>
            {error && <div>{error}</div>}
        </form>
    );
}

export default LoginForm;