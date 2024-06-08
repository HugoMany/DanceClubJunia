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
 *               type: array
 *               items:
 *                 type: object
 *                 description: Informations du cours modifie
 *                 properties:
 *                   courseId:
 *                     type: integer
 *                     example: 3
 *                   image:
 *                     type: string
 *                     example: "image.png"
 *                   title:
 *                     type: string
 *                     example: "Cours de danse"
 *                   type:
 *                     type: string
 *                     example: "Salsa"
 *                   duration:
 *                     type: integer
 *                     example: 60
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-06-15"
 *                   startTime:
 *                     type: string
 *                     example: "18:00"
 *                   location:
 *                     type: string
 *                     example: "Salle de danse 1"
 *                   maxParticipants:
 *                     type: integer
 *                     example: 20
 *                   paymentType:
 *                     type: string
 *                     example: "ticket,subscription,card"
 *                   isEvening:
 *                     type: boolean
 *                     example: true
 *                   recurrence:
 *                     type: integer
 *                     example: 7
 *                   teachers:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["john.doe@example.com"]
 *                   links:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["http://example.com"]
 *                   students:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["test@example.com"]
 *                   tags:
 *                     type: string
 *                     example: "danse,salsa,debutant"
 *       500:
 *         description: Erreur SQL
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
 *       400:
 *         description: Entree invalide
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
 *         description: Entrée invalide
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
 *                     properties:
 *                       courseId:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       type:
 *                         type: string
 *                       startDate:
 *                         type: string
 *                         format: date
 *                       location:
 *                         type: string
 *                       maxParticipants:
 *                         type: integer
 *                       isEvening:
 *                         type: boolean
 *       400:
 *         description: Erreur de requete.
 *       500:
 *         description: Erreur du serveur.
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
 *       500:
 *         description: Erreur SQL
 */
router.get('/getTicketPrice', guestController.getTicketPrice);

/**
 * @swagger
 * /api/guest/getSubscriptionPrice:
 *   get:
 *     summary: Récupère le prix de l'abonnement
 *     tags: [Guest]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Prix de l'abonnement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 subscriptionPrice:
 *                   type: integer
 *                   example: 35
 *       500:
 *         description: Erreur SQL
 */
router.get('/getSubscriptionPrice', guestController.getSubscriptionPrice);

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
 *       500:
 *         description: Erreur SQL
 */
router.get('/getCardPrices', guestController.getCardPrices);

/**
 * @swagger
 * /api/guest/getContactsTeachers:
 *   get:
 *     summary: Recupere tous les emails des professeurs.
 *     tags: [Guest]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste d'emails des professeurs recuperee avec succes.
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

router.get('/getContactsTeachers', guestController.getContactsTeachers);



module.exports = router;