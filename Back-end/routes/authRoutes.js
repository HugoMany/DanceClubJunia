const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /api/auth/verifyToken:
 *   get:
 *     summary: Vérifie la validité du token JWT
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token est valide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: ID de l'utilisateur
 *                   example: 12345
 *                 userType:
 *                   type: string
 *                   description: Type de l'utilisateur
 *                   example: admin
 *                 message:
 *                   type: string
 *                   example: Token is valid
 *       401:
 *         description: Token est invalide ou a expiré
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token expired
 *       402:
 *         description: Aucun token fourni
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No token provided
 */
router.get('/verifyToken', authController.verifyToken);

module.exports = router;
