const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API pour la gestion des etudiants
 */

/**
 * @swagger
 * /api/student/addCredit:
 *   post:
 *     summary: Ajouter des credits au compte d'un etudiant
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentID:
 *                 type: integer
 *                 description: ID de l'etudiant
 *                 example: 2
 *               credit:
 *                 type: integer
 *                 description: Montant des credits a ajouter
 *                 example: 50
 *     responses:
 *       200:
 *         description: Credits ajoutes avec succes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *       400:
 *         description: Entree invalide
 *       500:
 *         description: Erreur SQL
 */
router.post('/addCredit', studentController.addCredit);

/**
 * @swagger
 * /api/student/getSubscriptionEndDate:
 *   get:
 *     summary: Obtenir la date de fin d'abonnement d'un etudiant
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: studentID
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de l'etudiant
 *           example: 2
 *     responses:
 *       200:
 *         description: Date de fin d'abonnement recuperee avec succes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   subscriptionEndDate:
 *                     type: string
 *                     example: "2025-01-29T00:00:00.000Z"
 *       400:
 *         description: Entree invalide
 *       500:
 *         description: Erreur SQL
 */
router.get('/getSubscriptionEndDate', studentController.getSubscriptionEndDate);

/**
 * @swagger
 * /api/student/getCourses:
 *   get:
 *     summary: Obtenir la liste des cours d'un etudiant
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: studentID
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de l'etudiant
 *           example: 7
 *     responses:
 *       200:
 *         description: Cours recuperes avec succes
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
 *                       courseID:
 *                         type: integer
 *                         example: 4
 *                       image:
 *                         type: string
 *                         example: "https://example.com/image2.jpg"
 *                       title:
 *                         type: string
 *                         example: "Test Course 2"
 *                       type:
 *                         type: string
 *                         example: "Seminar"
 *                       duration:
 *                         type: integer
 *                         example: 90
 *                       startDate:
 *                         type: string
 *                         example: "2024-07-15T14:00:00.000Z"
 *                       location:
 *                         type: string
 *                         example: "Room 202"
 *                       maxParticipants:
 *                         type: integer
 *                         example: 20
 *                       paymentType:
 *                         type: string
 *                         example: "one-time"
 *                       paymentOptions:
 *                         type: string
 *                         example: "{\"single\": 20}"
 *                       isEvening:
 *                         type: integer
 *                         example: 1
 *                       recurrence:
 *                         type: integer
 *                         example: 0
 *                       teachersID:
 *                         type: string
 *                         example: "[2, 3]"
 *                       links:
 *                         type: string
 *                         example: "[\"link3\", \"link4\", \"test\"]"
 *                       studentsID:
 *                         type: string
 *                         example: "[7]"
 *                       tags:
 *                         type: string
 *                         example: "[\"tag3\", \"tag4\"]"
 *       400:
 *         description: Entree invalide
 *       500:
 *         description: Erreur SQL
 */
router.get('/getCourses', studentController.getCourses);

/**
 * @swagger
 * /api/student/buyPlace:
 *   post:
 *     summary: Acheter un ou plusieurs tickets, cartes ou mois d'abonnement pour un etudiant
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentID:
 *                 type: integer
 *                 description: ID de l'etudiant
 *                 example: 2
 *               type:
 *                 type: string
 *                 description: Type d'achat (ticket, carte, abonnement)
 *                 example: "ticket"
 *               number:
 *                 type: integer
 *                 description: Nombre d'elements a acheter
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
 *                   example: "Place purchased successfully"
 *       400:
 *         description: Nombre invalide
 *       401:
 *         description: Identifiant invalide
 *       500:
 *         description: Erreur SQL
 */
router.post('/buyPlace', studentController.buyPlace);

/**
 * @swagger
 * /api/student/getPaymentHistory:
 *   get:
 *     summary: Obtenir l'historique des paiements d'un etudiant
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: studentID
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de l'etudiant
 *           example: 2
 *     responses:
 *       200:
 *         description: Historique des paiements recupere avec succes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 payments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       paymentID:
 *                         type: integer
 *                         description: ID du paiement
 *                         example: 4
 *                       userID:
 *                         type: integer
 *                         description: ID de l'utilisateur
 *                         example: 2
 *                       price:
 *                         type: number
 *                         description: Montant paye
 *                         example: 49.99
 *                       type:
 *                         type: string
 *                         description: Type de paiement (ticket, carte, abonnement, credit)
 *                         example: Course Fee
 *                       quantity:
 *                         type: integer
 *                         description: Quantite achetee
 *                         example: 1
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Date du paiement
 *                         example: "2024-06-01T10:00:00.000Z"
 *                       paymentType:
 *                         type: string
 *                         description: Methode de paiement (en ligne, en especes)
 *                         example: Credit Card
 *       400:
 *         description: Entree invalide
 *       500:
 *         description: Erreur SQL
 */
router.get('/getPaymentHistory', studentController.getPaymentHistory);

module.exports = router;
