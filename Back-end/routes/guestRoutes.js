const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');

/**
 * @swagger
 * tags:
 *   name: Guest
 *   description: API pour la gestion des visiteurs
 */

/**
 * @swagger
 * /api/guest/getAllCourses:
 *   get:
 *     summary: Récupère tous les cours
 *     tags: [Guest]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de tous les cours
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Informations du cours modifie
 *                     properties:
 *                       courseId:
 *                         type: integer
 *                         example: 3
 *                       image:
 *                         type: string
 *                         example: "image.png"
 *                       title:
 *                         type: string
 *                         example: "Cours de danse"
 *                       type:
 *                         type: string
 *                         example: "Salsa"
 *                       duration:
 *                         type: integer
 *                         example: 60
 *                       startDate:
 *                         type: string
 *                         format: date
 *                         example: "2024-10-15T18:00:00.000Z"
 *                       location:
 *                         type: string
 *                         example: "Salle de danse 1"
 *                       maxParticipants:
 *                         type: integer
 *                         example: 20
 *                       paymentType:
 *                         type: string
 *                         example: "ticket,card"
 *                       isEvening:
 *                         type: integer
 *                         example: 0
 *                       recurrence:
 *                         type: integer
 *                         example: 7
 *                       teachersID:
 *                         type: string
 *                         example: "[1]"
 *                       links:
 *                         type: string
 *                         example:  "[\"http://example.com\"]"
 *                       studentsID:
 *                         type: string
 *                         example: "[2, 3]"
 *                       tags:
 *                         type: string
 *                         example: "[\"danse\", \"salsa\", \"debutant\"]"
 *       500:
 *         description: Erreur SQL
 *       501:
 *         description: Il n'y a pas de cours.
 */
router.get('/getAllCourses', guestController.getAllCourses);

/**
 * @swagger
 * /api/guest/login:
 *   post:
 *     summary: Connexion de l'utilisateur
 *     tags: [Guest]
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
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *               captcha:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Utilisateur connecté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 userID:
 *                   type: integer
 *                   example: 1
 *                 userType:
 *                   type: string
 *                   example: "student"
 *                 token:
 *                   type: string
 *                   example: "ihrezbgihyozerghuizoreGHUIGZROH3"
 *                 refreshToken:
 *                   type: string
 *                   example: "rieoprhguoierphgnueiorghuieeeryr"
 *       400:
 *         description: Email manquant.
 *       401:
 *         description: Mot de passe manquant.
 *       402:
 *         description: Email invalide.
 *       403:
 *         description: Mot de passe trop court (minimum 8 caractères).
 *       404:
 *         description: Captcha manquant.
 *       501:
 *         description: Identifiants invalides.
 *       502:
 *         description: Échec de la vérification reCAPTCHA.
 *       503:
 *         description: Erreur lors de la vérification reCAPTCHA.
 *       500:
 *         description: Erreur SQL
 */
router.post('/login', guestController.login);

/**
 * @swagger
 * /api/guest/registerStudent:
 *   post:
 *     summary: Inscrit un compte d'élève
 *     tags: [Guest]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: "John"
 *               surname:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *               photo:
 *                 type: string
 *                 example: "https://picsum.photos/200/200"
 *               connectionMethod:
 *                 type: string
 *                 example: "email"
 *               captcha:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Inscription réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 studentID:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Au moins un des champs suivants n'est pas rempli firstname, surname, email, password, connectionMethod
 *       401:
 *         description: Email invalide.
 *       402:
 *         description: Mot de passe trop court (minimum 8 caractères).
 *       403:
 *         description: Captcha manquant.
 *       501:
 *         description: Erreur lors de la vérification de l'existence de l'email.
 *       502:
 *         description: Email déjà utilisé.
 *       503:
 *         description: Erreur lors de la création du compte.
 *       504:
 *         description: Échec de la vérification reCAPTCHA.
 *       505:
 *         description: Erreur lors de la vérification reCAPTCHA.
 *       506:
 *         description: Erreur lors du hachage du mot de passe.
 *       500:
 *         description: Erreur SQL
 */
router.post('/registerStudent', guestController.registerStudent);

/**
 * @swagger
 * /api/guest/getCoursesByPeriod:
 *   get:
 *     summary: Recupere les cours dans une periode donnee.
 *     tags: [Guest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           required: true
 *           description: Date a partir de laquelle on recupere les cours au format "YYYY-MM-DD"
 *           example: 2024-01-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           required: true
 *           description: Date jusqu'a laquelle on recupere les cours au format "YYYY-MM-DD"
 *           example: 2025-01-01
 *     responses:
 *       200:
 *         description: Liste de cours recuperee avec succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Informations du cours modifie
 *                     properties:
 *                       courseId:
 *                         type: integer
 *                         example: 3
 *                       image:
 *                         type: string
 *                         example: "image.png"
 *                       title:
 *                         type: string
 *                         example: "Cours de danse"
 *                       type:
 *                         type: string
 *                         example: "Salsa"
 *                       duration:
 *                         type: integer
 *                         example: 60
 *                       startDate:
 *                         type: string
 *                         format: date
 *                         example: "2024-10-15T18:00:00.000Z"
 *                       location:
 *                         type: string
 *                         example: "Salle de danse 1"
 *                       maxParticipants:
 *                         type: integer
 *                         example: 20
 *                       paymentType:
 *                         type: string
 *                         example: "ticket,card"
 *                       isEvening:
 *                         type: integer
 *                         example: 0
 *                       recurrence:
 *                         type: integer
 *                         example: 7
 *                       teachersID:
 *                         type: string
 *                         example: "[1]"
 *                       links:
 *                         type: string
 *                         example:  "[\"http://example.com\"]"
 *                       studentsID:
 *                         type: string
 *                         example: "[2, 3]"
 *                       tags:
 *                         type: string
 *                         example: "[\"danse\", \"salsa\", \"debutant\"]"
 *       400:
 *         description: Les paramètres startDate et endDate sont requis.
 *       401:
 *         description: Les dates de début et de fin doident être au format YYYY-MM-DD.
 *       501:
 *         description: Erreur lors de la récupération des cours.
 *       502:
 *         description: Il n'y a pas de cours pour cette période.
 *       500:
 *         description: Erreur SQL
 */
router.get('/getCoursesByPeriod', guestController.getCoursesByPeriod);

/**
 * @swagger
 * /api/guest/getTicketPrice:
 *   get:
 *     summary: Récupère le prix du ticket unitaire
 *     tags: [Guest]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Prix du ticket unitaire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 ticketPrice:
 *                   type: integer
 *                   example: 5
 *       501:
 *         description: Erreur lors de la récupération du prix du ticket.
 *       502:
 *         description: Le prix du ticket n'a pas été trouvé.
 *       500:
 *         description: Erreur SQL
 */
router.get('/getTicketPrice', guestController.getTicketPrice);

/**
 * @swagger
 * /api/guest/getCardPrices:
 *   get:
 *     summary: Récupère le prix de toutes les cartes
 *     tags: [Guest]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des prix des cartes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 cardPrices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       number:
 *                         type: integer
 *                         example: 5
 *                       price:
 *                         type: integer
 *                         example: 12
 *       501:
 *         description: Erreur lors de la récupération du prix des cartes.
 *       502:
 *         description: Le prix des cartes n'a pas été trouvé
 *       500:
 *         description: Erreur SQL
 */
router.get('/getCardPrices', guestController.getCardPrices);

/**
 * @swagger
 * /api/guest/getContactsTeachers:
 *   post:
 *     summary: Récupère les noms, prénoms et emails des professeurs. Permet de filtrer par une liste d'IDs.
 *     tags: [Guest]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userIDs:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Liste d'IDs des professeurs à récupérer
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Liste des contacts des professeurs récupérée avec succès.
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
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       firstname:
 *                         type: string
 *                         example: "John"
 *                       surname:
 *                         type: string
 *                         example: "Doe"
 *       501:
 *         description: Erreur lors de la récupération des contacts.
 *       502:
 *         description: Il n'y a pas de professeur.
 *       500:
 *         description: Erreur SQL
 */
router.post('/getContactsTeachers', guestController.getContactsTeachers);



/**
 * @swagger
 * /api/guest/generateResetToken:
 *   post:
 *     summary: Générer un jeton de réinitialisation pour un utilisateur
 *     tags: [Guest]
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
 *                   example: Token généré et stocké.
 *       400:
 *         description: Email manquant.
 *       401:
 *         description: Email invalide.
 *       501:
 *         description: Erreur lors de la vérification de l'existence du token.
 *       502:
 *         description: Erreur lors de l'insertion du token dans la base de données.
 *       503:
 *         description: Erreur lors de la vérification de l'existence de l'utilisateur.
 *       504:
 *         description: L'utilisateur n'existe pas.
 *       500:
 *         description: Erreur SQL
 */
router.post('/generateResetToken', guestController.generateResetToken);

/**
 * @swagger
 * /api/guest/resetPassword:
 *   post:
 *     summary: Réinitialiser le mot de passe d'un utilisateur
 *     tags: [Guest]
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
 *         description: Token et newPassword sont requis.
 *       401:
 *         description: Le mot de passe est trop court.
 *       501:
 *         description: Token expiré.
 *       502:
 *         description: Token introuvable.
 *       503:
 *         description: Erreur lors de la modification du mot de passe.
 *       504:
 *         description: Le token n'existe pas.
 *       505:
 *         description: Token invalide.
 *       500:
 *         description: Erreur SQL
 */
router.post('/resetPassword', guestController.resetPassword);

module.exports = router;