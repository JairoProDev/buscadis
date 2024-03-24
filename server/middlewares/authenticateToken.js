// authenticateToken.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log('Authorization header:', authHeader); // Agregado para depuración

    const token = authHeader && authHeader.split(' ')[1];
    console.log('Token:', token); // Agregado para depuración

    if (token == null) {
        return res.status(401).json({ message: 'No se proporcionó ningún token' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        console.log('Decoded user:', user); // Agregado para depuración
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;