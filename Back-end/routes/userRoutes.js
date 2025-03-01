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
 *         description: Le champs courseID, userID et link doivent être fourni.
 *       401:
 *         description: L'ID de l'utilisateur n'est pas un entier positif.
 *       402:
 *         description: L'ID du cours n'est pas un entier positif.
 *       501:
 *         description: Erreur lors de la vérification du type de l'utilisateur.
 *       502:
 *         description: L'utilisateur n'existe pas.
 *       503:
 *         description: Erreur lors de la vérification de la présence de de l'élève dans le cours.
 *       504:
 *         description: Le cours n'existe pas.
 *       505:
 *         description: Erreur lors de l'ajout du lien.
 *       506:
 *         description: L'élève n'est pas dans le cours.
 *       507:
 *         description: Le professeur n'est pas dans le cours.
 *       508:
 *         description: Erreur lors de la vérification de la présence du professeur dans le cours.
 *       509:
 *         description: Utilisateur invalide.
 *       510:
 *         description: Le lien existe déjà dans le cours.
 *       500:
 *         description: Erreur SQL
 */
router.patch('/addLink', userController.addLink);

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
 *         description: Le champs tags, userID et startDate doivent être fourni.
 *       401:
 *         description: L'ID de l'utilisateur n'est pas un entier positif.
 *       402:
 *         description: La date de début du cours doit être au format YYYY-MM-DD.
 *       501:
 *         description: Erreur lors de la recherche de cours.
 *       502:
 *         description: Le cours n'a pas été trouvé.
 *       500:
 *         description: Erreur SQL
 */
router.get('/searchCoursesStudent', userController.searchCoursesStudent);

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
 *         description: Le champs tags, userID et startDate doivent être fourni.
 *       401:
 *         description: L'ID de l'utilisateur n'est pas un entier positif.
 *       402:
 *         description: La date de début du cours doit être au format YYYY-MM-DD.
 *       501:
 *         description: Erreur lors de la recherche de cours.
 *       502:
 *         description: Le cours n'a pas été trouvé.
 *       500:
 *         description: Erreur SQL
 */
router.get('/searchCoursesTeacher', userController.searchCoursesTeacher);

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
 *         description: Le champ courseID doit être fourni.
 *       401:
 *         description: L'ID du cours n'est pas un entier positif.
 *       501:
 *         description: Erreur lors de la recherche de cours.
 *       502:
 *         description: Le cours n'a pas été trouvé
 *       500:
 *         description: Erreur SQL
 */
router.get('/searchCourse', userController.searchCourse);

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
 *       501:
 *         description: Erreur lors de la récupération des contacts.
 *       500:
 *         description: Erreur SQL
 */

router.get('/getContactsStudents', userController.getContactsStudents);

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
 *                     tickets:
 *                       type: integer
 *                       example: 2
 *                     photo:
 *                       type: string
 *                       example: "photo.png"
 *       400:
 *         description: Champ userID manquant.
 *       401:
 *         description: L'ID de l'utilisateur n'est pas un entier positif.
 *       402:
 *         description: Le userID et le token ne correspondent pas
 *       501:
 *         description: Erreur lors de la récupération du type d'utilisateur.
 *       502:
 *         description: Erreur lors de la récupération du profil.
 *       50:
 *         description: L'utilisateur n'existe pas.
 *       500:
 *         description: Erreur SQL
 */
router.get('/getProfile', userController.getProfile);

/**
 * @swagger
 * /api/user/modifyProfile:
 *   patch:
 *     summary: Modifier les informations d'un utilisateur
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
 *                 description: ID de l'utilisateur a modifier.
 *                 example: 6
 *               firstname:
 *                 type: string
 *                 description: Prenom de l'utilisateur.
 *                 example: "Lucas"
 *               surname:
 *                 type: string
 *                 description: Nom de famille de l'utilisateur.
 *                 example: "Vano"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email de l'utilisateur.
 *                 example: "lucas.vano@example.com"
 *               photo:
 *                 type: string
 *                 description: Photo de l'utilisateur.
 *                 example: "photo.png"
 *               description:
 *                 type: string
 *                 description: description de l'utilisateur.
 *                 example: "description"
 *     responses:
 *       200:
 *         description: etudiant modifie avec succes
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
 *                     tickets:
 *                       type: integer
 *                       example: 2
 *                     photo:
 *                       type: string
 *                       example: "photo.png"
 *       400:
 *         description: userID manquant
 *       401:
 *         description: Le champ userID doit être un entier positif.
 *       402:
 *         description: Email invalide.
 *       403:
 *         description: Aucun champ à mettre à jour.
 *       501:
 *         description: Erreur lors de la récupération du type de l'utilisateur.
 *       502:
 *         description: Aucun utilisateur trouvé.
 *       503:
 *         description: Erreur lors de la modification de l'utilisateur.
 *       504:
 *         description: Erreur lors de la récupération de l'utilisateur.
 *       500:
 *         description: Erreur SQL
 */
router.patch('/modifyProfile', userController.modifyProfile);

module.exports = router;
