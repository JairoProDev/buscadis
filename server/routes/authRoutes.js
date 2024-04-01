const express = require("express"); // para crear el router
const bcrypt = require("bcrypt"); // para hashear las contraseñas
const jwt = require("jsonwebtoken"); // para crear tokens JWT
const User = require("../models/User"); // para interactuar con la base de datos

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body); // Esto imprimirá el cuerpo de la solicitud en la consola del servidor
  try {
    const { firstName, lastName, userName, phoneNumber, email, password } = req.body;

    // Validación de los datos de entrada
    if (!firstName || !lastName || !userName || !phoneNumber || !email || !password) {
      return res
        .status(400)
        .json({
          message:
            "Por favor, proporciona un nombre, apellido, número de teléfono, correo electrónico y una contraseña",
        });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }

    // Comprueba si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Crea un nuevo usuario
    const user = new User({
      firstName,
      lastName,
      userName,
      phoneNumber,
      email,
      password,
    });

    console.log(user);
    // Guarda el usuario en la base de datos
    const savedUser = await user.save();

    // Envía una respuesta al cliente
    res.json({ message: "Usuario registrado con éxito", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body); // Esto imprimirá el cuerpo de la solicitud en la consola del servidor
  try {
    const { email, password } = req.body;

    // Comprueba si el usuario existe
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    // Imprime la contraseña proporcionada y la contraseña hasheada almacenada
    console.log("Contraseña proporcionada:", password);
    console.log("Contraseña hasheada almacenada:", user.password);

    // Comprueba si la contraseña es correcta
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Crea un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // Envía el token al cliente
    res.json({ token, message: "Inicio de sesión exitoso" });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

router.delete('/users/:id', async (req, res) => {
    console.log('DELETE request received for user:', req.params.id);

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(404).send({ message: 'User not found' });
        }

        console.log('Usuario encontrado:', user);

        await User.deleteOne({ _id: req.params.id });
        console.log('Usuario removido');

        const response = { message: 'User deleted successfully' };
        console.log('Response:', response);
        res.send(response);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send({ message: error.message });
    }
});

router.post('/users/:id/delete_request', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Aquí podrías agregar el código para marcar la cuenta del usuario para la eliminación
        // Por ejemplo, podrías cambiar el estado de la cuenta del usuario a 'pending deletion'

        res.send({ message: 'Delete request received. We will process your request shortly.' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;