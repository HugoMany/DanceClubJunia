const express = require('express');
const router = express.Router();
const adminTeacherController = require('../controllers/adminTeacherController');
const { authorize } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: AdminTeacher
 *   description: API pour la gestion des administrateurs et des professeurs
 */

/**
 * @swagger
 * /api/adminTeacher/addPlaceStudent:
 *   post:
 *     summary: Ajouter un ou plusieurs tickets, cartes ou mois d'abonnement pour un etudiant
 *     tags: [AdminTeacher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: ID de l'utilisateur faisant l'ajout
 *                 example: 2
 *               studentID:
 *                 type: integer
 *                 description: ID de l'etudiant
 *                 example: 6
 *               type:
 *                 type: string
 *                 description: Type d'achat (ticket, carte, abonnement)
 *                 example: "ticket"
 *               number:
 *                 type: integer
 *                 description: Nombre d'elements a ajouter
 *                 example: 5
 *     responses:
 *       200:
 *         description: Achat reussi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Place added successfully"
 *       400:
 *         description: Nombre invalide
 *       401:
 *         description: Identifiant etudiant invalide
 *       402:
 *         description: Identifiant utilisateur invalide
 *       500:
 *         description: Erreur SQL
 */
router.post('/addPlaceStudent', authorize(['teacher', 'admin']), adminTeacherController.addPlaceStudent);

/**
 * @swagger
 * /api/adminTeacher/removeLink:
 *   patch:
 *     summary: Retirer un lien d'un cours
 *     tags: [AdminTeacher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseID:
 *                 type: integer
 *                 description: ID du cours duquel retirer l'etudiant.
 *                 example: 6
 *               userID:
 *                 type: integer
 *                 description: ID de l'utilisateur executant l'action.
 *                 example: 2
 *               link:
 *                 type: string
 *                 description: lien a retirer
 *                 example: https://www.google.fr
 *     responses:
 *       200:
 *         description: liens retire avec succes du cours
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Entree invalide
 *       500:
 *         description: Erreur SQL
 */
router.patch('/removeLink', adminTeacherController.removeLink);

/**
 * @swagger
 * /api/adminTeacher/addTag:
 *   post:
 *     summary: Ajoute un tag à un cours
 *     tags: [AdminTeacher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: ID du professeur
 *                 example: 1
 *               courseID:
 *                 type: integer
 *                 description: ID du cours
 *                 example: 3
 *               tag:
 *                 type: string
 *                 description: Tag à ajouter
 *                 example: "tag"
 *     responses:
 *       200:
 *         description: Tag ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Erreur de requête
 *       500:
 *         description: Erreur serveur
 */
router.post('/addTag', adminTeacherController.addTag);

/**
 * @swagger
 * /api/adminTeacher/removeTag:
 *   patch:
 *     summary: Retirer un tag d'un cours
 *     tags: [AdminTeacher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseID:
 *                 type: integer
 *                 description: ID du cours duquel retirer le tag.
 *                 example: 4
 *               userID:
 *                 type: integer
 *                 description: ID de l'utilisateur executant l'action.
 *                 example: 2
 *               tag:
 *                 type: string
 *                 description: tag a retirer
 *                 example: tag
 *     responses:
 *       200:
 *         description: tag retire avec succes du cours
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Entree invalide
 *       500:
 *         description: Erreur SQL
 */
router.patch('/removeTag', adminTeacherController.removeTag);

module.exports = router;