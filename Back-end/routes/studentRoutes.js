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
 * /api/student/getCourses:
 *   get:
 *     summary: Obtenir la liste des cours d'un etudiant
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
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
 *                       roomPrice:
 *                         type: integer
 *                         example: 100
 *                       attendance:
 *                         type: string
 *                         example: "[10, 7]"
 *       400:
 *         description: Champ studentID manquant.
 *       401:
 *         description: Le champ studentID doit être un entier positif.
 *       402:
 *         description: Le studentID et le token ne correspondent pas
 *       501:
 *         description: Erreur lors de la récupération des cours.
 *       500:
 *         description: Erreur SQL
 */
router.get('/getCourses', studentController.getCourses);

/**
 * @swagger
 * /api/student/buyPlace:
 *   post:
 *     summary: Acheter un ou plusieurs tickets ou une carte
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
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
 *                 description: Type d'achat (ticket, carte)
 *                 example: "ticket"
 *               number:
 *                 type: integer
 *                 description: Nombre de tickets ou de places de la carte
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
 *         description: Tous les champs doivent être remplis.
 *       401:
 *         description: Le champ studentID doit être un entier positif.
 *       402:
 *         description: Type de place non valide. Utilisez "ticket" ou "card".
 *       403:
 *         description: number n'est pas un entier postif.
 *       404:
 *         description: Le studentID et le token ne correspondent pas
 *       501:
 *         description: Erreur lors de la récupération du prix.
 *       502:
 *         description: Erreur lors de l'ajout du ticket à l'élève.
 *       503:
 *         description: Erreur lors de l'ajout de la carte à l'élève.
 *       504:
 *         description: Erreur lors de l'enregistrement du paiement.
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
 *     security:
 *       - bearerAuth: []
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
 *                         description: Type de paiement (ticket, carte)
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
 *                         example: online
 *       400:
 *         description: Champ studentID manquant.
 *       401:
 *         description: Le champ studentID doit être un entier positif.
 *       402:
 *         description: Le studentID et le token ne correspondent pas
 *       403:
 *         description: Un professeur ne peut pas exécuter cette requête
 *       501:
 *         description: Erreur lors de la récupération des paiements.
 *       500:
 *         description: Erreur SQL
 */
router.get('/getPaymentHistory', studentController.getPaymentHistory);

/**
 * @swagger
 * /api/student/reserveCourse:
 *   post:
 *     summary: Réserve un cours pour un étudiant
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentID:
 *                 type: integer
 *                 description: ID de l'étudiant
 *                 example: 1
 *               courseID:
 *                 type: integer
 *                 description: ID du cours
 *                 example: 2
 *     responses:
 *       200:
 *         description: Réservation réussie
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
 *                   example: "L'étudiant a été ajouté au cours via un ticket."
 *       400:
 *         description: ID de l'étudiant ou ID du cours manquant
 *       401:
 *         description: Le champ studentID doit être un entier positif
 *       402:
 *         description: Le champ courseID doit être un entier positif
 *       403:
 *         description: Le studentID et le token ne correspondent pas
 *       404:
 *         description: Un professeur ne peut pas exécuter cette requête
 *       501:
 *         description: L'élève est déjà inscrit à ce cours.
 *       502:
 *         description: Aucun mode de paiement valide trouvé ou fonds insuffisants.
 *       503:
 *         description: Le cours n'existe pas.
 *       504:
 *         description: Erreur lors de la récupération du cours.
 *       505:
 *         description: Erreur lors de la récupération de l'élève.
 *       506:
 *         description: L'élève n'existe pas.
 *       507:
 *         description: Erreur lors de la récupération des élèves du cours.
 *       508:
 *         description: Erreur lors de la modification du cours.
 *       509:
 *         description: Erreur lors de la récupération d'une carte valide.
 *       510:
 *         description: Erreur lors de la suppression de la carte utilisée.
 *       511:
 *         description: Erreur lors de l'utilisation de la carte.
 *       512:
 *         description: Erreur lors de la décrémentation des tickets.
 *       513:
 *         description: L'utilisateur n'est pas un élève.
 *       500:
 *         description: Erreur SQL
 */
router.post('/reserveCourse', studentController.reserveCourse);

/**
 * @swagger
 * /api/student/unsubscribeCourse:
 *   post:
 *     summary: Désinscrire un étudiant d'un cours
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentID:
 *                 type: integer
 *                 description: ID de l'étudiant
 *                 example: 1
 *               courseID:
 *                 type: integer
 *                 description: ID du cours
 *                 example: 1
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: ID de l'étudiant ou ID du cours manquant.
 *       401:
 *         description: Le champ studentID doit être un entier positif.
 *       402:
 *         description: Le champ courseID doit être un entier positif.
 *       403:
 *         description: Le studentID et le token ne correspondent pas.
 *       404:
 *         description: Un professeur ne peut pas exécuter cette requête.
 *       501:
 *         description: Le cours n'existe pas.
 *       502:
 *         description: Le cours a déjà commencé ou est terminé.
 *       503:
 *         description: L'élève n'est pas inscrit à ce cours.
 *       504:
 *         description: Erreur lors de l'incrémentation des tickets.
 *       505:
 *         description: Erreur lors de la récupération de l'élève.
 *       506:
 *         description: Erreur lors de la modification du cours.
 *       500:
 *         description: Erreur SQL
 */
router.post('/unsubscribeCourse', studentController.unsubscribeCourse);

module.exports = router;
