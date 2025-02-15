const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const SECRET = process.env.JWT_SECRET || 'tajny_klucz';

const authController = {
  register: async (req, res) => {
    const { email, password } = req.body;
    try {
      // Sprawdzenie, czy użytkownik już istnieje
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Użytkownik już istnieje' });
      }
      // Hashowanie hasła
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.createUser(email, hashedPassword);
      res.status(201).json({ message: 'Użytkownik zarejestrowany', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Błąd serwera', error: error.message });
    }
  },

  login: async (req, res) => {
    // Passport weryfikuje użytkownika i ustawia go w req.user
    const user = req.user;
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Zalogowano', token });
  }
};

module.exports = authController;
