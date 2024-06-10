const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authorize } = require('../middlewares/auth');

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
 *     security:
 *       - bearerAuth: []
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
router.post('/generateResetToken', authorize(['student', 'teacher', 'admin']), userController.generateResetToken);

/**
 * @swagger
 * /api/user/resetPassword:
 *   post:
 *     summary: Réinitialiser le mot de passe d'un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
router.post('/resetPassword', authorize(['student', 'teacher', 'admin']), userController.resetPassword);

/**
 * @swagger
 * /api/user/addLink:
 *   patch:
 *     summary: Ajouter un lien à un cours pour un utilisateur
 *     tags: [Users]
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
router.patch('/addLink', authorize(['student', 'teacher', 'admin']), userController.addLink);

/**
 * @swagger
 * /api/user/searchCoursesStudent:
 *   get:
 *     summary: Rechercher les cours auxquels un etudiant a participe
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userID
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
 *         description: Erreur SQL
 */
router.get('/searchCoursesStudent', authorize(['student', 'teacher', 'admin']), userController.searchCoursesStudent);

/**
 * @swagger
 * /api/user/searchCoursesTeacher:
 *   get:
 *     summary: Rechercher les cours auxquels un professeur a participe
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userID
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID du professeur
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
 *         description: Erreur SQL
 */
router.get('/searchCoursesTeacher', authorize(['student', 'teacher', 'admin']), userController.searchCoursesTeacher);

/**
 * @swagger
 * /api/user/searchCourse:
 *   get:
 *     summary: Rechercher un cours par son ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: courseID
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID du cours
 *           example: 3
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
 *         description: Erreur SQL
 */
router.get('/searchCourse', authorize(['student', 'teacher', 'admin']), userController.searchCourse);

/**
 * @swagger
 * /api/user/getContactsStudents:
 *   get:
 *     summary: Recupere tous les emails des eleves.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste d'emails des eleves recuperee avec succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 contacts:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "john.doe@example.com"
 *       500:
 *         description: Erreur du serveur.
 */

router.get('/getContactsStudents', authorize(['student', 'teacher', 'admin']), userController.getContactsStudents);

/**
 * @swagger
 * /api/user/getProfile:
 *   get:
 *     summary: Recuperer ses propres informations
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userID
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de l'utilisateur
 *           example: 6
 *     responses:
 *       200:
 *         description: Profil recupere avec succes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     userID:
 *                       type: integer
 *                       example: 6
 *                     firstname:
 *                       type: string
 *                       example: "Lucas"
 *                     surname:
 *                       type: string
 *                       example: "Vano"
 *                     email:
 *                       type: string
 *                       example: "lucas.vano@example.com"
 *                     connectionMethod:
 *                       type: string
 *                       example: "email"
 *                     credit:
 *                       type: integer
 *                       example: 0
 *                     tickets:
 *                       type: integer
 *                       example: 2
 *                     subscriptionEnd:
 *                       type: string
 *                       format: date
 *                       nullable: true
 *                       example: null
 *                     photo:
 *                       type: string
 *                       example: "photo.png"
 *       400:
 *         description: Entree invalide
 *       500:
 *         description: Erreur SQL
 */
router.get('/getProfile', authorize(['student', 'teacher', 'admin']), userController.getProfile);

module.exports = router;
