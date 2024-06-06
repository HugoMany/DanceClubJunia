const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API pour la gestion des utilisateurs
 */

/**
 * @swagger
 * /api/user/generateResetToken:
 *   post:
 *     summary: Générer un jeton de réinitialisation pour un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email de l'utilisateur pour lequel générer le jeton de réinitialisation.
 *                 example: john.doe@example.com
 *     responses:
 *       200:
 *         description: Jeton généré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Token generated and stored
 *       400:
 *         description: Email non renseigné
 *       500:
 *         description: Erreur SQL
 */
router.post('/generateResetToken', userController.generateResetToken);

/**
 * @swagger
 * /api/user/resetPassword:
 *   post:
 *     summary: Réinitialiser le mot de passe d'un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Jeton de réinitialisation du mot de passe.
 *                 example: "abc123"
 *               newPassword:
 *                 type: string
 *                 description: Nouveau mot de passe pour l'utilisateur.
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Mot de passe réinitialisé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Mot de passe réinitialisé avec succès"
 *       400:
 *         description: Entrée invalide
 *       500:
 *         description: Erreur du serveur
 */
router.post('/resetPassword', userController.resetPassword);

/**
 * @swagger
 * /api/user/addLink:
 *   patch:
 *     summary: Ajouter un lien à un cours pour un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: ID de l'utilisateur auquel ajouter le lien.
 *                 example: 123
 *               courseID:
 *                 type: integer
 *                 description: ID du cours auquel ajouter le lien.
 *                 example: 456
 *               link:
 *                 type: string
 *                 description: Lien à ajouter au cours pour l'utilisateur.
 *                 example: "http://example.com"
 *     responses:
 *       200:
 *         description: Lien ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Lien ajouté avec succès"
 *       400:
 *         description: Entrée invalide
 *       500:
 *         description: Erreur du serveur
 */
router.patch('/addLink', userController.addLink);

/**
 * @swagger
 * /api/user/searchCourses:
 *   get:
 *     summary: Rechercher les cours auxquels un utilisateur a participe
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: studentID
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de l'etudiant
 *           example: 7
 *       - in: query
 *         name: startDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           description: Date de debut pour la recherche
 *           example: "2023-01-01"
 *       - in: query
 *         name: tags
 *         required: false
 *         schema:
 *           type: string
 *           description: Tags pour filtrer les cours
 *           example: "tag1,tag2"
 *     responses:
 *       200:
 *         description: Cours trouves avec succes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       courseID:
 *                         type: integer
 *                         description: ID du cours
 *                       courseName:
 *                         type: string
 *                         description: Nom du cours
 *                       instructor:
 *                         type: string
 *                         description: Nom de l'instructeur
 *                       schedule:
 *                         type: string
 *                         description: Horaire du cours
 *       400:
 *         description: Entree invalide
 *       500:
 *         description: Erreur du serveur
 */
router.get('/searchCourses', userController.searchCourses);

module.exports = router;
