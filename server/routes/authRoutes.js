const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require('../middlewares/authMiddleware');
const validator = require('validator');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, password } = req.body;

    // Validación de los datos de entrada
    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      return res.status(400).json({
        message: "Por favor, proporciona todos los campos requeridos.",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }

    // Validar formato de email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Correo electrónico no válido" });
    }

    // Validar formato de número de teléfono
    if (!validator.isMobilePhone(phoneNumber, 'any')) {
      return res.status(400).json({ message: "Número de teléfono no válido" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo electrónico ya está registrado" });
    }

    // Crear un nuevo usuario
    const user = new User({ firstName, lastName, phoneNumber, email, password });

    // Guardar el usuario en la base de datos
    const savedUser = await user.save();

    // Generar un token JWT para el usuario recién registrado
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    // Responder con el token y el usuario creado
    res.status(201).json({ message: "Usuario registrado con éxito", token, user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
});

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar que el usuario exista
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Correo electrónico o contraseña incorrectos" });
    }

    // Comparar la contraseña proporcionada con la almacenada
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Correo electrónico o contraseña incorrectos" });
    }

    // Generar un token JWT con tiempo de expiración
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    // Responder con el token
    res.json({ token, message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

// Ruta para eliminar un usuario
router.delete('/users/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await User.deleteOne({ _id: req.params.id });

    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
});

// Ruta para obtener los detalles de un usuario
router.get('/users/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -tokens');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
