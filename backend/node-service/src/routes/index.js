const express = require('express');
const router = express.Router();
const { taskController } = require('../controllers');

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Pobierz listę zadań
 *     responses:
 *       200:
 *         description: Lista zadań.
 */
router.get('/tasks', taskController.getTasks);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Utwórz nowe zadanie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Przykładowe zadanie
 *               description:
 *                 type: string
 *                 example: Opis zadania
 *     responses:
 *       201:
 *         description: Zadanie utworzone pomyślnie.
 */
router.post('/tasks', taskController.createTask);

module.exports = router;
