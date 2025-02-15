const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Rejestracja użytkownika
 *     description: Rejestracja nowego użytkownika.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: haslo123
 *     responses:
 *       201:
 *         description: Użytkownik zarejestrowany pomyślnie.
 *       400:
 *         description: Użytkownik już istnieje.
 *       500:
 *         description: Błąd serwera.
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Logowanie użytkownika
 *     description: Logowanie użytkownika i otrzymanie tokenu JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: haslo123
 *     responses:
 *       200:
 *         description: Zalogowano, token JWT.
 *       401:
 *         description: Nieprawidłowe dane logowania.
 *       500:
 *         description: Błąd serwera.
 */
router.post('/login', passport.authenticate('local', { session: false }), authController.login);

module.exports = router;
