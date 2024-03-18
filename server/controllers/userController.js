const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar al usuario en la base de datos
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

module.exports = { login };

// //  función de inicio de sesión en un servidor Express.js. Aquí está lo que hace cada parte:

// Importación de módulos: Importas los módulos que necesitas, incluyendo bcrypt para verificar las contraseñas, jsonwebtoken para crear tokens JWT para la autenticación, y tu modelo de usuario de Mongoose.

// Función de inicio de sesión: Defines una función asíncrona login que toma una solicitud y una respuesta.

// Obtención de los datos de la solicitud: Extraes el correo electrónico y la contraseña del cuerpo de la solicitud.

// Búsqueda del usuario: Buscas al usuario en la base de datos por correo electrónico. Si no se encuentra ningún usuario, envías una respuesta con un estado 400 (Solicitud incorrecta) y un mensaje de error.

// Verificación de la contraseña: Verificas si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos para el usuario. Si no coincide, envías una respuesta con un estado 400 y un mensaje de error.

// Generación del token JWT: Si el correo electrónico y la contraseña son correctos, generas un token JWT que contiene el ID del usuario y tiene una duración de 1 hora.

// Envío de la respuesta: Envías una respuesta con un estado 200 (OK), un mensaje de éxito y el token.