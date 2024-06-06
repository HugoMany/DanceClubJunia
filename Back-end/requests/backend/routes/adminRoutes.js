const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authorize } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API pour la gestion des administrateurs
 */

/**
 * @swagger
 * /api/admin/getAllStudents:
 *   get:
 *     summary: Recupere tous les etudiants
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de tous les etudiants
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
 *                   students:
 *                     type: object
 *                     properties:
 *                       userID:
 *                         type: integer
 *                         example: 6
 *                       firstname:
 *                         type: string
 *                         example: "Lucas"
 *                       surname:
 *                         type: string
 *                         example: "Vano"
 *                       email:
 *                         type: string
 *                         example: "lucas.vano@example.com"
 *                       connectionMethod:
 *                         type: string
 *                         example: "email"
 *                       credit:
 *                         type: integer
 *                         example: 0
 *                       tickets:
 *                         type: integer
 *                         example: 2
 *                       subscriptionEnd:
 *                         type: string
 *                         format: date
 *                         nullable: true
 *                         example: null
 *                       photo:
 *                         type: string
 *                         example: "https://picsum.photos/200/200"
 *       500:
 *         description: Erreur serveur
 */
router.get('/getAllStudents', authorize(['admin']), adminController.getAllStudents);

/**
 * @swagger
 * /api/admin/getAllTeachers:
 *   get:
 *     summary: Recupere tous les professeurs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de tous les professeurs
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
 *                   teachers:
 *                     type: object
 *                     properties:
 *                       userID:
 *                         type: integer
 *                         example: 6
 *                       firstname:
 *                         type: string
 *                         example: "Lucas"
 *                       surname:
 *                         type: string
 *                         example: "Vano"
 *                       email:
 *                         type: string
 *                         example: "lucas.vano@example.com"
 *                       connectionMethod:
 *                         type: string
 *                         example: "email"
 *                       photo:
 *                         type: string
 *                         example: "https://picsum.photos/200/200"
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         example: "chevalier déchu"
 *       500:
 *         description: Erreur serveur
 */
router.get('/getAllTeachers', authorize(['admin']), adminController.getAllTeachers);

/**
 * @swagger
 * /api/admin/getAllAdmins:
 *   get:
 *     summary: Recupere tous les administrateurs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de tous les administrateurs
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
 *                   admins:
 *                     type: object
 *                     properties:
 *                       userID:
 *                         type: integer
 *                         example: 6
 *                       firstname:
 *                         type: string
 *                         example: "Lucas"
 *                       surname:
 *                         type: string
 *                         example: "Vano"
 *                       email:
 *                         type: string
 *                         example: "lucas.vano@example.com"
 *                       connectionMethod:
 *                         type: string
 *                         example: "email"
 *                       photo:
 *                         type: string
 *                         example: "https://picsum.photos/200/200"
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         example: "chevalier déchu"
 *       500:
 *         description: Erreur serveur
 */
router.get('/getAllAdmins', authorize(['admin']), adminController.getAllAdmins);

/**
 * @swagger
 * /api/admin/getAllUsers:
 *   get:
 *     summary: Recupere tous les utilisateurs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de tous les utilisateurs
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
 *                   users:
 *                     type: object
 *                     properties:
 *                       userID:
 *                         type: integer
 *                         example: 6
 *                       firstname:
 *                         type: string
 *                         example: "Lucas"
 *                       surname:
 *                         type: string
 *                         example: "Vano"
 *                       email:
 *                         type: string
 *                         example: "lucas.vano@example.com"
 *                       connectionMethod:
 *                         type: string
 *                         example: "email"
 *                       userType:
 *                         type: string
 *                         example: "student"
 *                       credit:
 *                         type: integer
 *                         example: 0
 *                       tickets:
 *                         type: integer
 *                         example: 2
 *                       subscriptionEnd:
 *                         type: string
 *                         format: date
 *                         nullable: true
 *                         example: null
 *                       photo:
 *                         type: string
 *                         example: "https://picsum.photos/200/200"
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         example: "chevalier déchu"
 *       500:
 *         description: Erreur serveur
 */
router.get('/getAllUsers', authorize(['admin']), adminController.getAllUsers);

/**
 * @swagger
 * /api/admin/deleteCourse:
 *   delete:
 *     summary: Supprime un cours
 *     tags: [Admin]
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
 *                 description: ID du cours
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cours supprime avec succes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Erreur de requete
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'La suppression du cours a echoue.'
 *       500:
 *         description: Erreur serveur
 */
router.delete('/deleteCourse', authorize(['admin']), adminController.deleteCourse);

/**
 * @swagger
 * /api/admin/createCard:
 *   post:
 *     summary: Cree une carte avec un nombre de places et un prix specifies
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               place:
 *                 type: integer
 *                 description: Nombre maximum d'utilisations de la carte
 *                 example: 10
 *               price:
 *                 type: integer
 *                 description: Prix en credits
 *                 example: 12
 *     responses:
 *       200:
 *         description: Carte creee avec succes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Mauvaise requête
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'echec de la creation de la carte.'
 *                 error:
 *                   type: string
 *                   example: 'Le champ place doit être un entier positif.'
 *       500:
 *         description: Erreur serveur
 */
router.post('/createCard', authorize(['admin']), adminController.createCard);

/**
 * @swagger
 * /api/admin/deleteCard:
 *   delete:
 *     summary: Supprime une carte dont le nombre de place a ete specifie
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               place:
 *                 type: integer
 *                 description: Nombre maximum d'utilisations de la carte a supprimer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Carte supprimee avec succes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Mauvaise requete
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'echec de la suppression de la carte.'
 *                 error:
 *                   type: string
 *                   example: 'Le champ place doit etre un entier positif.'
 *       500:
 *         description: Erreur serveur
 */
router.delete('/deleteCard', authorize(['admin']), adminController.deleteCard);

/**
 * @swagger
 * /api/admin/modifyPlacePrice:
 *   post:
 *     summary: Modifie le prix du ticket unitaire, de l'abonnement ou d'une carte.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: Type de place ("ticket", "subscription" ou "cardN" avec N le nombre d'utilisations).
 *                 example: "ticket"
 *               price:
 *                 type: integer
 *                 description: Prix en credits.
 *                 example: 100
 *     responses:
 *       200:
 *         description: Succes de la modification du prix.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Erreur de requete.
 *       500:
 *         description: Erreur du serveur.
 */
router.post('/modifyPlacePrice', authorize(['admin']), adminController.modifyPlacePrice);

/**
 * @swagger
 * /api/admin/createCourse:
 *   post:
 *     summary: Cree un cours
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: Image du cours.
 *                 example: "image.png"
 *               title:
 *                 type: string
 *                 description: Titre du cours.
 *                 example: "Cours de danse"
 *               type:
 *                 type: string
 *                 description: Type du cours
 *                 example: "Salsa"
 *               duration:
 *                 type: integer
 *                 description: Duree du cours en minutes.
 *                 example: 60
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Date du cours au format "YYYY-MM-DD"
 *                 example: "2024-06-15"
 *               startTime:
 *                 type: string
 *                 description: Heure de debut du cours au format "HH:MM"
 *                 example: "18:00"
 *               location:
 *                 type: string
 *                 description: Lieu du cours.
 *                 example: "Salle de danse 1"
 *               maxParticipants:
 *                 type: integer
 *                 description: Nombre maximal d'apprenants.
 *                 example: 20
 *               paymentType:
 *                 type: string
 *                 description: Types de paiements acceptes (separes par une virgule).
 *                 example: "ticket,subscription,card"
 *               isEvening:
 *                 type: boolean
 *                 description: Statut de soiree du cours (true si c'est une soiree).
 *                 example: false
 *               recurrence:
 *                 type: integer
 *                 description: Nombre de jours d'intervalle entre deux cours (0 pour aucun).
 *                 example: 7
 *               teachers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Emails des professeurs assignes au cours.
 *                 example: ["john.doe@example.com"]
 *               links:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Liens relatifs au cours.
 *                 example: ["http://example.com"]
 *               students:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Emails des eleves a inscrire au cours.
 *                 example: ["test@example.com"]
 *               tags:
 *                 type: string
 *                 description: Tags du cours (separes par une virgule).
 *                 example: "danse,salsa,debutant"
 *     responses:
 *       200:
 *         description: Cours cree avec succes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 course:
 *                   type: object
 *                   description: Informations du cours cree.
 *                   properties:
 *                     courseId:
 *                       type: integer
 *                       example: 3
 *                     image:
 *                       type: string
 *                       example: "image.png"
 *                     title:
 *                       type: string
 *                       example: "Cours de danse"
 *                     type:
 *                       type: string
 *                       example: "Salsa"
 *                     duration:
 *                       type: integer
 *                       example: 60
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: "2024-06-15"
 *                     startTime:
 *                       type: string
 *                       example: "18:00"
 *                     location:
 *                       type: string
 *                       example: "Salle de danse 1"
 *                     maxParticipants:
 *                       type: integer
 *                       example: 20
 *                     paymentType:
 *                       type: string
 *                       example: "ticket,subscription,card"
 *                     isEvening:
 *                       type: boolean
 *                       example: false
 *                     recurrence:
 *                       type: integer
 *                       example: 7
 *                     teachers:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["john.doe@example.com"]
 *                     links:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["http://example.com"]
 *                     students:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["test@example.com"]
 *                     tags:
 *                       type: string
 *                       example: "danse,salsa,debutant"
 *       400:
 *         description: Erreur de requete.
 *       500:
 *         description: Erreur du serveur.
 */
router.post('/createCourse', authorize(['admin']), adminController.createCourse);

/**
 * @swagger
 * /api/admin/createTeacher:
 *   post:
 *     summary: Cree un professeur.
 *     tags: [Admin]
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
 *                 description: Prenom du professeur.
 *                 example: John
 *               surname:
 *                 type: string
 *                 description: Nom de famille du professeur.
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse e-mail du professeur.
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: Mot de passe du professeur.
 *                 example: secret123
 *               connectionMethod:
 *                 type: string
 *                 description: Methode de connexion du professeur
 *                 example: email
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Photo du professeur (fichier).
 *                 example: photo.png
 *               description:
 *                 type: string
 *                 description: Description du professeur.
 *                 example: Professeur passionne de mathematiques.
 *     responses:
 *       201:
 *         description: Professeur cree avec succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 teacher:
 *                   $ref: '#/components/schemas/Teacher'
 *       400:
 *         description: Erreur de requete - tous les champs sont obligatoires.
 *       500:
 *         description: Erreur du serveur lors de la creation du professeur.
 */
router.post('/createTeacher', authorize(['admin']), adminController.createTeacher);

/**
 * @swagger
 * /api/admin/getPayments:
 *   get:
 *     summary: Renvoie la liste des paiements dans une période si elle est renseignée
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Date de début
 *         example : "2024-1-6"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Date de fin
 *         example : "2024-5-01"
 *     responses:
 *       200:
 *         description: Liste des paiements
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
 *                         example: 3
 *                       userID:
 *                         type: integer
 *                         example: 3
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 30.0
 *                       type:
 *                         type: string
 *                         example: "equipment"
 *                       quantity:
 *                         type: integer
 *                         example: 3
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-10T16:30:00.000Z"
 *                       paymentType:
 *                         type: string
 *                         example: "bank transfer"
 *                       sourceID:
 *                         type: integer
 *                         example: null
 *       500:
 *         description: Erreur SQL
 */
router.get('/getPayments', authorize(['admin']), adminController.getPayments);

module.exports = router;
