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
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 students:
 *                   type: array
 *                   items:
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
 *         description: Aucun élève trouvé.
 */
router.get('/getAllStudents', adminController.getAllStudents);

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
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 teachers:
 *                   type: array
 *                   items:
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
 *         description: Aucun professeur trouvé.
 */
router.get('/getAllTeachers', adminController.getAllTeachers);

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
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 admins:
 *                   type: array
 *                   items:
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
 *         description: Aucun admin trouvé.
 */
router.get('/getAllAdmins', adminController.getAllAdmins);

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
 *         description: Aucun utilisateur trouvé.
 */
router.get('/getAllUsers', adminController.getAllUsers);

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
 *         description: Erreur de requête - ID du cours manquant
 *       401:
 *         description: L'ID du cours n'est pas un entier
 *       501:
 *         description: Erreur lors de la vérification de l'existence du cours
 *       502:
 *         description: Le cours spécifié n'existe pas
 *       503:
 *         description: Erreur lors de la suppression du cours
 *       500:
 *         description: Erreur SQL
 */
router.delete('/deleteCourse', adminController.deleteCourse);

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
 *         description: Erreur de requête - champ place obligatoires
 *       401:
 *         description: Erreur de requête - prix manquant
 *       402:
 *         description: Erreur de requête - le champ place doit être un entier positif
 *       403:
 *         description: Erreur de requête - le champ price doit être un entier positif
 *       501:
 *         description: Erreur serveur - Erreur lors de la vérification de l'existence de la carte
 *       502:
 *         description: Erreur serveur - La carte existe déjà
 *       503:
 *         description: Erreur serveur - Erreur lors de l'insertion de la carte dans la base de données
 *       500:
 *         description: Erreur serveur - Erreur SQL
 */
router.post('/createCard', adminController.createCard);

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
 *         description: Nombre de places manquant.
 *       401:
 *         description: Le champ place doit être un entier positif
 *       501:
 *         description: Erreur lors de la vérification de l'existence de la carte
 *       502:
 *         description: La carte spécifiée n'existe pas
 *       503:
 *         description: Erreur lors de la suppression de la carte
 */
router.delete('/deleteCard', adminController.deleteCard);

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
 *         description: Les paramètres type et price sont requis.
 *       401:
 *         description: Type de place non valide. Utilisez "ticket", "subscription" ou "cardN".
 *       402:
 *         description: Format de carte invalide. Utilisez "cardN" où N est un entier.
 *       403:
 *         description: Le prix doit être un entier positif.
 *       501:
 *         description: Nombre d'utilisations de la carte non valide.
 *       502:
 *         description: Erreur lors de la vérification de l'existence de la carte.
 *       503:
 *         description: La carte avec le nombre d'utilisations spécifié n'existe pas.
 *       504:
 *         description: Erreur lors de la modification de la carte.
 *       505:
 *         description: Erreur lors de la modification du prix.
 *       506:
 *         description: Le type de place n'est pas valide.
 *       500:
 *         description: Erreur SQL
 */
router.post('/modifyPlacePrice', adminController.modifyPlacePrice);

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
 *         description: Certains champs obligatoires sont manquants ou invalides.
 *       401:
 *         description: Certains champs numériques sont invalides.
 *       402:
 *         description: La date de début du cours doit être au format YYYY-MM-DD.
 *       403:
 *         description: L'heure de début du cours doit être au format HH:MM.
 *       404:
 *         description: La date ou l'heure de début du cours est invalide.
 *       500:
 *         description: Erreur SQL.
 *       501:
 *         description: Impossible de spécifier des enseignants pour un cours en soirée.
 *       502:
 *         description: Erreur lors de la création du cours.
 *       503:
 *         description: Erreur lors de la récupération du cours.
 *       504:
 *         description: Erreur lors de la récupération des ID.
 *       505:
 *         description: Les emails n'appartiennent à aucun utilisateur.
 */
router.post('/createCourse', adminController.createCourse);

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
 *       200:
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
 *                   type: object
 *                   properties:
 *                     firstname:
 *                       type: string
 *                       example: John
 *                     surname:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: john.doe@example.com
 *                     connectionMethod:
 *                       type: string
 *                       example: email
 *                     photo:
 *                       type: string
 *                       format: binary
 *                       example: photo.png
 *                     description:
 *                       type: string
 *                       example: Professeur passionné de mathématiques.
 *       400:
 *         description: Erreur de requête - tous les champs sont obligatoires.
 *       401:
 *         description: Erreur de requête - e-mail invalide.
 *       402:
 *         description: Erreur de requête - mot de passe trop court (minimum 8 caractères).
 *       501:
 *         description: Erreur serveur - erreur lors de la création du professeur.
 *       502:
 *         description: Erreur serveur - erreur lors de la récupération du professeur.
 *       500:
 *         description: Erreur SQL
 */
router.post('/createTeacher', adminController.createTeacher);

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
 *       400:
 *         description: Erreur de requête - les paramètres startDate et endDate sont requis.
 *       401:
 *         description: Erreur de requête - les dates de début et de fin doivent être au format YYYY-MM-DD.
 *       501:
 *         description: Erreur lors de la récupération des paiements.
 *       500:
 *         description: Erreur SQL
 */
router.get('/getPayments', adminController.getPayments);

/**
 * @swagger
 * /api/admin/deleteTeacher:
 *   delete:
 *     summary: Supprime un professeur
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
 *               teacherID:
 *                 type: integer
 *                 description: ID du professeur
 *                 example: 3
 *     responses:
 *       200:
 *         description: Professeur supprime avec succes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: ID du professeur manquant.
 *       401:
 *         description: L'ID du professeur n'est pas un entier.
 *       501:
 *         description: Erreur lors de la vérification de l'existence du professeur.
 *       502:
 *         description: Le professeur spécifié n'existe pas.
 *       503:
 *         description: Cet utilisateur n'est pas un professeur.
 *       504:
 *         description: Erreur lors de la récupération du professeur dans le cours.
 *       505:
 *         description: Erreur lors de la modification du cours.
 *       506:
 *         description: Erreur lors de la suppression du professeur dans les cartes.
 *       507:
 *         description: Erreur lors de la suppression des paiements.
 *       508:
 *         description: Erreur lors de la suppression du professeur.
 *       500:
 *         description: Erreur SQL
 */
router.delete('/deleteTeacher', adminController.deleteTeacher);

/**
 * @swagger
 * /api/admin/deleteStudent:
 *   delete:
 *     summary: Supprime un etudiant
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
 *               studentID:
 *                 type: integer
 *                 description: ID de l'etudiant
 *                 example: 3
 *     responses:
 *       200:
 *         description: Etudiant supprime avec succes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: ID de l'étudiant manquant.
 *       401:
 *         description: L'ID de l'étudiant n'est pas un entier.
 *       501:
 *         description: Erreur lors de la vérification de l'existence de l'étudiant.
 *       502:
 *         description: L'étudiant spécifié n'existe pas.
 *       503:
 *         description: Cet utilisateur n'est pas un étudiant.
 *       504:
 *         description: Erreur lors de la récupération de l'étudiant dans le cours.
 *       505:
 *         description: Erreur lors de la modification du cours.
 *       506:
 *         description: Erreur lors de la suppression de l'étudiant dans les cartes.
 *       507:
 *         description: Erreur lors de la suppression des paiements.
 *       508:
 *         description: Erreur lors de la suppression de l'étudiant.
 *       500:
 *         description: Erreur SQL
 */
router.delete('/deleteStudent', adminController.deleteStudent);

/**
 * @swagger
 * /api/admin/modifyTeacher:
 *   patch:
 *     summary: Modifier les informations d'un professeur
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
 *               teacherID:
 *                 type: integer
 *                 description: ID du professeur a modifier.
 *                 example: 6
 *               firstname:
 *                 type: string
 *                 description: Prenom du professeur.
 *                 example: "Lucas"
 *               surname:
 *                 type: string
 *                 description: Nom de famille du professeur.
 *                 example: "Vano"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email du professeur.
 *                 example: "lucas.vano@example.com"
 *               password:
 *                 type: string
 *                 description: Mot de passe du professeur.
 *                 example: "password123"
 *               connectionMethod:
 *                 type: string
 *                 description: Methode de connexion du professeur.
 *                 example: "email"
 *               credit:
 *                 type: integer
 *                 description: Credit du professeur.
 *                 example: 0
 *               photo:
 *                 type: string
 *                 description: Photo du professeur.
 *                 example: "photo.png"
 *               description:
 *                 type: string
 *                 description: description professeur.
 *                 example: "description"
 * 
 *     responses:
 *       200:
 *         description: professeur modifie avec succes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 student:
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
 *                     description:
 *                       type: string
 *                       description: description professeur.
 *                       example: "description"
 *       400:
 *         description: Erreur de requête - ID du professeur manquant ou invalide.
 *       401:
 *         description: Erreur de requête - Le champ teacherID doit être un entier positif.
 *       402:
 *         description: Erreur de requête - Email invalide.
 *       403:
 *         description: Erreur de requête - Mot de passe trop court (minimum 8 caractères).
 *       404:
 *         description: Erreur de requête - Crédit invalide.
 *       405:
 *         description: Erreur de requête - Aucun champ à mettre à jour.
  *       501:
 *         description: Erreur lors de la modification du professeur.
 *       502:
 *         description: Il n'existe pas de professeur avec cet ID.
 *       503:
 *         description: Erreur lors de la récupération du professeur.
 *       500:
 *         description: Erreur SQL
 */
router.patch('/modifyTeacher', adminController.modifyTeacher);

module.exports = router;
