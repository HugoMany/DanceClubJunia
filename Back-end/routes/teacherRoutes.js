const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { authorize } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: API pour la gestion des enseignants et de leurs cours
 */

/**
 * @swagger
 * /api/teacher/getStudent:
 *   get:
 *     summary: Recuperer un etudiant par son ID
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: studentID
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de l'etudiant
 *           example: 6
 *     responses:
 *       200:
 *         description: Etudiant recupere avec succes
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
 *         description: ID du cours manquante
 *       401:
 *         description: Le champ studentID doit être un entier positif.
 *       501:
 *         description: Erreur lors de la récupération de l'élève.
 *       502:
 *         description: Aucun élève trouvé avec cet ID.
 *       500:
 *         description: Erreur SQL
 */
router.get('/getStudent', teacherController.getStudent);

/**
 * @swagger
 * /api/teacher/newStudent:
 *   post:
 *     summary: Creer un nouvel etudiant
 *     tags: [Teachers]
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
 *                 description: Prenom de l'etudiant.
 *                 example: "Lucas"
 *               surname:
 *                 type: string
 *                 description: Nom de famille de l'etudiant.
 *                 example: "Vano"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email de l'etudiant.
 *                 example: "lucas.vano@example.com"
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'etudiant.
 *                 example: "password123"
 *               connectionMethod:
 *                 type: string
 *                 description: Methode de connexion de l'etudiant.
 *                 example: "email"
 *               photo:
 *                 type: string
 *                 description: Photo de l'etudiant.
 *                 example: "photo.png"
 *     responses:
 *       200:
 *         description: etudiant cree avec succes
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
 *         description: Tous les champs doivent être remplis.
 *       401:
 *         description: Mot de passe trop court (minimum 8 caractères).
 *       402:
 *         description: Email invalide.
 *       501:
 *         description: Erreur lors de la vérification de l'email.
 *       502:
 *         description: L'email est déjà utilisé.
 *       503:
 *         description: Erreur lors de la création de l'élève.
 *       504:
 *         description: Erreur lors de la récupération de l'élève.
 *       505:
 *         description: L'utilisateur n'existe pas
 *       500:
 *         description: Erreur SQL
 */
router.post('/newStudent', teacherController.newStudent);

/**
 * @swagger
 * /api/teacher/modifyStudent:
 *   patch:
 *     summary: Modifier les informations d'un etudiant
 *     tags: [Teachers]
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
 *                 description: ID de l'etudiant a modifier.
 *                 example: 6
 *               firstname:
 *                 type: string
 *                 description: Prenom de l'etudiant.
 *                 example: "Lucas"
 *               surname:
 *                 type: string
 *                 description: Nom de famille de l'etudiant.
 *                 example: "Vano"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email de l'etudiant.
 *                 example: "lucas.vano@example.com"
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'etudiant.
 *                 example: "password123"
 *               connectionMethod:
 *                 type: string
 *                 description: Methode de connexion de l'etudiant.
 *                 example: "email"
 *               photo:
 *                 type: string
 *                 description: Photo de l'etudiant.
 *                 example: "photo.png"
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
 *         description: studentID manquant
 *       401:
 *         description: Le champ studentID doit être un entier positif.
 *       402:
 *         description: Email invalide.
 *       403:
 *         description: Mot de passe trop court (minimum 8 caractères).
 *       404:
 *         description: Aucun champ à mettre à jour.
 *       501:
 *         description: Erreur lors de la modification de l'élève.
 *       502:
 *         description: Il n'existe pas d'élève avec cet ID.
 *       503:
 *         description: Erreur lors de la récupération de l'élève.
 *       500:
 *         description: Erreur SQL
 */
router.patch('/modifyStudent', teacherController.modifyStudent);

/**
 * @swagger
 * /api/teacher/removeStudent:
 *   patch:
 *     summary: Retirer un etudiant d'un cours
 *     tags: [Teachers]
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
 *                 description: ID du cours duquel retirer l'etudiant
 *                 example: 6
 *               studentID:
 *                 type: integer
 *                 description: ID de l'etudiant a retirer du cours
 *                 example: 2
 *     responses:
 *       200:
 *         description: etudiant retire avec succes du cours
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Tous les champs doivent être remplis.
 *       401:
 *         description: Mot de passe trop court (minimum 8 caractères).
 *       402:
 *         description: L'ID du cours n\'est pas un entier positif.
 *       501:
 *         description: L'élève ne fait pas parti de ce cours.
 *       502:
 *         description: Le cours n'existe pas.
 *       503:
 *         description: Erreur lors de la modification de l'élève.
 *       504:
 *         description: Erreur lors de la récupération des élèves du cours.
 *       505:
 *         description: Le professeur ne fais pas parti du cours (token)
 *       500:
 *         description: Erreur SQL
 */
router.patch('/removeStudent', teacherController.removeStudent);

/**
 * @swagger
 * /api/teacher/affectStudent:
 *   patch:
 *     summary: Affecter un etudiant a un cours
 *     tags: [Teachers]
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
 *                 description: ID de l'etudiant a affecter.
 *                 example: 10
 *               courseID:
 *                 type: integer
 *                 description: ID du cours auquel l'etudiant sera affecte.
 *                 example: 3
 *     responses:
 *       200:
 *         description: etudiant affecte avec succes au cours
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Les champs userID, courseID et studentID doivent être fournis.
 *       401:
 *         description: L'ID de l'étudiant n'est pas un entier positif.
 *       402:
 *         description: L'ID du cours n'est pas un entier positif.
 *       501:
 *         description: La récupération du nombre de cours du professeur a échoué.
 *       502:
 *         description: Le professeur n'est pas autorisé à modifier ce cours ou le cours n'existe pas.
 *       503:
 *         description: Erreur lors de la récupération des ID avec les emails fournis.
 *       504:
 *         description: La modification du cours a échoué.
 *       505:
 *         description: Le cours n'existe pas.
 *       506:
 *         description: La récupération du cours a échoué.
 *       507:
 *         description: Erreur lors de la vérification de l'existence de l'étudiant.
 *       508:
 *         description: L'étudiant n'existe pas.
 *       500:
 *         description: Erreur SQL
 */
router.patch('/affectStudent', teacherController.affectStudent);

/**
 * @swagger
 * /api/teacher/searchStudent:
 *   get:
 *     summary: Recherche des etudiants en fonction de leur prenom, nom de famille et/ou email.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: firstname
 *         required: false
 *         schema:
 *           type: string
 *         description: Prenom de l'etudiant a rechercher.
 *       - in: query
 *         name: surname
 *         required: false
 *         schema:
 *           type: string
 *         description: Nom de famille de l'etudiant a rechercher.
 *       - in: query
 *         name: email
 *         required: false
 *         schema:
 *           type: string
 *         description: Adresse email de l'etudiant a rechercher.
 *     responses:
 *       200:
 *         description: Liste des etudiants correspondants a la recherche.
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
 *                   student:
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
 *                       tickets:
 *                         type: integer
 *                         example: 2
 *                       photo:
 *                         type: string
 *                         example: "photo.png"
 *       400:
 *         description: Au moins un critère de recherche doit être fourni.
 *       401:
 *         description: Email invalide.
 *       501:
 *         description: Erreur lors de la récupération des élèves.
 *       502:
 *         description: Aucun élève trouvé.
 *       500:
 *         description: Erreur SQL
 */
router.get('/searchStudent', teacherController.searchStudent);

/**
 * @swagger
 * /api/teacher/cancelCourse:
 *   delete:
 *     summary: Annuler un cours
 *     tags: [Teachers]
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
 *                 description: ID du cours a annuler.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cours annule avec succes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: courseID manquant.
 *       401:
 *         description: L'ID du cours n'est pas un entier positif.
 *       501:
 *         description: Erreur lors de la suppression.
 *       502:
 *         description: Le cours n'existe pas ou le professeur n'est pas dans le cours ou le cours est déjà passé.
 *       500:
 *         description: Erreur SQL
 */
router.delete('/cancelCourse', teacherController.cancelCourse);

/**
 * @swagger
 * /api/teacher/getTeacherPlaces:
 *   get:
 *     summary: Renvoie le nombre d'etudiants a qui le professeur a fait cours dans une periode donnee
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: teacherID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du professeur
 *         example: 123
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Date a partir de laquelle on compte le nombre d'etudiants a qui le professeur a fait cours.
 *         example: "2024-01-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Date jusqu'a laquelle on compte le nombre d'etudiants a qui le professeur a fait cours.
 *         example: "2024-12-31"
 *     responses:
 *       200:
 *         description: Nombre d'etudiants a qui le professeur a fait cours dans la periode specifiee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 teacherPlaces:
 *                   type: integer
 *                   description: Nombre d'etudiants a qui le professeur a fait cours dans la periode specifiee.
 *                   example: 25
 *       400:
 *         description: Le champ teacherID doit être fourni.
 *       401:
 *         description: L'ID du professeur n'est pas un entier positif.
 *       402:
 *         description: La date de début du cours doit être au format YYYY-MM-DD.
 *       403:
 *         description: La date de fin du cours doit être au format YYYY-MM-DD.
 *       404:
 *         description: Le teacherID et le token ne correspondent pas
 *       501:
 *         description: Erreur lors de la récupération du nombre d'élèves.
 *       500:
 *         description: Erreur SQL
 */
router.get('/getTeacherPlaces', teacherController.getTeacherPlaces);

/**
 * @swagger
 * /api/teacher/modifyCourse:
 *   patch:
 *     summary: Modifier les informations d'un cours
 *     tags: [Teachers]
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
 *                 description: ID du cours a modifier
 *                 example: 3
 *               image:
 *                 type: string
 *                 description: Image du cours
 *                 example: "image.png"
 *               title:
 *                 type: string
 *                 description: Titre du cours
 *                 example: "Cours de danse"
 *               type:
 *                 type: string
 *                 description: Type du cours
 *                 example: "Salsa"
 *               duration:
 *                 type: integer
 *                 description: Duree du cours en minutes
 *                 example: 60
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Date de debut du cours
 *                 example: "2024-06-15"
 *               startTime:
 *                 type: string
 *                 description: Heure de debut du cours
 *                 example: "18:00"
 *               location:
 *                 type: string
 *                 description: Lieu du cours
 *                 example: "Salle de danse 1"
 *               maxParticipants:
 *                 type: integer
 *                 description: Nombre maximum d'apprenants
 *                 example: 20
 *               paymentType:
 *                 type: string
 *                 description: Types de paiements acceptes (separes par une virgule)
 *                 example: "ticket,card"
 *               isEvening:
 *                 type: boolean
 *                 description: Indique si c'est une soiree
 *                 example: false
 *               recurrence:
 *                 type: integer
 *                 description: Nombre de jours d'intervalle entre deux cours
 *                 example: 0
 *               teachers:
 *                 type: array
 *                 description: Liste des emails des professeurs
 *                 items:
 *                   type: string
 *                   example: "john.doe@example.com"
 *               links:
 *                 type: array
 *                 description: Liste de liens associes au cours
 *                 items:
 *                   type: string
 *                   example: "http://example.com"
 *               students:
 *                 type: array
 *                 description: Liste des emails des apprenants
 *                 items:
 *                   type: string
 *                   example: "test@example.com"
 *               tags:
 *                 type: string
 *                 description: Tags associes au cours (separes par une virgule)
 *                 example: "danse,salsa,debutant"
 *               roomPrice:
 *                 type: number
 *                 description: Prix de la salle de cours.
 *                 example: 100
 *     responses:
 *       200:
 *         description: Cours modifie avec succes
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
 *                   description: Informations du cours modifie
 *                   properties:
 *                     courseID:
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
 *                       example: "2024-06-15T18:00:00.000Z"
 *                     location:
 *                       type: string
 *                       example: "Salle de danse 1"
 *                     maxParticipants:
 *                       type: integer
 *                       example: 20
 *                     paymentType:
 *                       type: string
 *                       example: "ticket,card"
 *                     isEvening:
 *                       type: integer
 *                       example: 0
 *                     recurrence:
 *                       type: integer
 *                       example: 7
 *                     teachersID:
 *                       type: string
 *                       example: "[1]"
 *                     links:
 *                       type: string
 *                       example: "[\"http://example.com\"]"
 *                     studentsID:
 *                       type: string
 *                       example: "[7]"
 *                     tags:
 *                       type: string
 *                       example: "[\"danse\", \"salsa\", \"debutant\"]"
 *       400:
 *         description: Les champs teacherID et courseID sont obligatoires.
 *       401:
 *         description: L'ID du cours n'est pas un entier positif.
 *       402:
 *         description: La durée doit être positive.
 *       403:
 *         description: Les dates de début et de fin doivent être au format YYYY-MM-DD.
 *       404:
 *         description: Le nombre maximal d'apprenants doit être positif.
 *       405:
 *         description: Une soirée ne peut pas avoir de professeur.
 *       406:
 *         description: La récurrence doit être positive ou nulle.
 *       407:
 *         description: Aucun champ à mettre à jour.
 *       408:
 *         description: Le prix de la salle doit être positif ou nul.
 *       501:
 *         description: La récupération du nombre de cours du professeur a échoué.
 *       502:
 *         description: Le professeur n'est pas autorisé à modifier ce cours ou le cours n'existe pas.
 *       503:
 *         description: Erreur lors de la récupération des ID avec les emails fournis
 *       504:
 *         description: La modification du cours a échoué.
 *       505:
 *         description: Le cours n'existe pas.
 *       506:
 *         description: La récupération du cours a échoué.
 *       500:
 *         description: Erreur SQL
 */
router.patch('/modifyCourse', teacherController.modifyCourse);

/**
 * @swagger
 * /api/teacher/getStudentsInCourse:
 *   get:
 *     summary: Recupere les informations des etudiants d'un cours
 *     tags: [Teachers]
 *     parameters:
 *       - in: query
 *         name: courseID
 *         schema:
 *           type: integer
 *           example: 3
 *         required: true
 *         description: ID du cours dont on veut recuperer les etudiants
 *     responses:
 *       200:
 *         description: Liste des etudiants du cours
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
 *                         example: 10
 *                       firstname:
 *                         type: string
 *                         example: "John"
 *                       surname:
 *                         type: string
 *                         example: "Doe"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       connectionMethod:
 *                         type: string
 *                         example: "email"
 *                       tickets:
 *                         type: integer
 *                         example: 4
 *                       photo:
 *                         type: string
 *                         example: "photo.png"
 *       400:
 *         description: Les champs courseID et userID doivent être fournis.
 *       401:
 *         description: L'ID de l'utilisateur n'est pas un entier positif.
 *       402:
 *         description: L'ID du cours n'est pas un entier positif.
 *       501:
 *         description: Erreur lors de la récupération des types d'utilisateurs.
 *       502:
 *         description: Aucun utilisateur trouvé.
 *       503:
 *         description: Erreur lors de la vérification de la présence du professeur dans le cours.
 *       504:
 *         description: Le professeur n'est pas dans le cours ou le cours n'existe pas.
 *       505:
 *         description: Erreur lors de la récupération du cours.
 *       506:
 *         description: Cours non trouvé.
 *       507:
 *         description: Erreur lors de la récupération de l'utilisateur.
 *       508:
 *         description: L'utilisateur n'a pas été trouvé.
 *       509:
 *         description: L'utilisateur n'est pas un professeur ou un administrateur.
 *       500:
 *         description: Erreur SQL.
 */
router.get('/getStudentsInCourse', teacherController.getStudentsInCourse);

/**
 * @swagger
 * /api/teacher/addPlaceStudent:
 *   post:
 *     summary: Ajouter un ou plusieurs tickets, cartes ou mois d'abonnement pour un etudiant
 *     tags: [Teachers]
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
 *         description: Le champs courseID et userID doivent être fournis.
 *       401:
 *         description: L'ID de l'utilisateur n'est pas un entier positif.
 *       402:
 *         description: L'ID de l'élève n'est pas un entier positif.
 *       403:
 *         description: number n'est pas un entier positif.
 *       501:
 *         description: Erreur lors de la récupération des prix.
 *       502:
 *         description: Le prix n'a pas été trouvé.
 *       503:
 *         description: Erreur lors de l'ajout de ticket(s) à l'utilisateur.
 *       504:
 *         description: Erreur lors de l'ajout de la carte à l'utilisateur.
 *       505:
 *         description: Erreur lors de la modification de la date de fin de l'abonnement de l'utilisateur.
 *       506:
 *         description: L'utilisateur n'existe pas.
 *       507:
 *         description: Erreur lors de l'enregistrement du paiement.
 *       500:
 *         description: Erreur SQL
 */
router.post('/addPlaceStudent', teacherController.addPlaceStudent);

/**
 * @swagger
 * /api/teacher/removeLink:
 *   patch:
 *     summary: Retirer un lien d'un cours
 *     tags: [Teachers]
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
 *         description: Les champs courseID, userID et link doivent être fournis.
 *       401:
 *         description: L'ID de l'utilisateur n'est pas un entier positif.
 *       402:
 *         description: L'ID du cours n'est pas un entier positif.
 *       501:
 *         description: Erreur lors de la récupération de l'utilisateur.
 *       502:
 *         description: L'utilisateur n'existe pas.
 *       503:
 *         description: L'utilisateur est un élève.
 *       504:
 *         description: Erreur lors de la vérification de la présence du professeur dans le cours.
 *       505:
 *         description: Le professeur ou le cours n'existe pas.
 *       506:
 *         description: userID ou userType invalide.
 *       507:
 *         description: Erreur lors de la récupération des liens du cours.
 *       508:
 *         description: Erreur lors de la modification du cours.
 *       509:
 *         description: Ce cours n'existe pas.
 *       510:
 *         description: Le lien n'est pas contenu dans le cours.
 *       511:
 *         description: Ce cours n'existe pas ou ce lien n'est pas dans le cours
 *       500:
 *         description: Erreur SQL
 */
router.patch('/removeLink', teacherController.removeLink);

/**
 * @swagger
 * /api/teacher/addTag:
 *   post:
 *     summary: Ajoute un tag à un cours
 *     tags: [Teachers]
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
 *         description: Les champs courseID, userID et tag doivent être fournis.
 *       401:
 *         description: L'ID de l'utilisateur n'est pas un entier positif.
 *       402:
 *         description: L'ID du cours n'est pas un entier positif.
 *       501:
 *         description: Erreur lors de la récupération du type de l'utilisateur.
 *       502:
 *         description: L'utilisateur n'existe pas
 *       503:
 *         description: Les élèves ne peuvent pas ajouter de tags aux cours.
 *       504:
 *         description: Erreur lors de la vérification de la présence du professeur dans le cours.
 *       505:
 *         description: Erreur Le cours n'existe pas.
 *       506:
 *         description: Le professeur n'est pas dans le cours.
 *       507:
 *         description: Erreur lors de la récupération des tags du cours.
 *       508:
 *         description: Le cours a déjà ce tag.
 *       509:
 *         description: Erreur lors de l'ajout du tag.
 *       510:
 *         description: L'utilisateur est invalide.
 *       500:
 *         description: Erreur SQL
 */
router.post('/addTag', teacherController.addTag);

/**
 * @swagger
 * /api/teacher/removeTag:
 *   patch:
 *     summary: Retirer un tag d'un cours
 *     tags: [Teachers]
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
 *         description: Les champs courseID, userID et tag doivent être fournis.
 *       401:
 *         description: L'ID de l'utilisateur n'est pas un entier positif.
 *       402:
 *         description: L'ID du cours n'est pas un entier positif.
 *       501:
 *         description: Erreur lors de la récupération du type de l'utilisateur.
 *       502:
 *         description: L'utilisateur n'existe pas
 *       503:
 *         description: Les élèves ne peuvent pas ajouter de tags aux cours.
 *       504:
 *         description: Erreur lors de la vérification de la présence du professeur dans le cours.
 *       505:
 *         description: Le cours n'existe pas.
 *       506:
 *         description: Le professeur n'est pas dans le cours.
 *       507:
 *         description: userType invalide.
 *       508:
 *         description: Erreur lors de la récupération des tags du cours.
 *       509:
 *         description: Le cours n'a pas ce tag.
 *       510:
 *         description: Erreur lors de la suppression du tag.
 *       500:
 *         description: Erreur SQL
 */
router.patch('/removeTag', teacherController.removeTag);


/**
 * @swagger
 * /api/teacher/markAttendance:
 *   post:
 *     summary: Marquer la présence d'un étudiant à un cours
 *     tags: [Teachers]
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
 *                 example: 6
 *                 description: ID de l'étudiant
 *               courseID:
 *                 type: integer
 *                 example: 17
 *                 description: ID du cours
 *     responses:
 *       200:
 *         description: Présence marquée avec succès
 *       400:
 *         description: Erreur lors du marquage de la présence
 */
router.post('/markAttendance', teacherController.markAttendance);

module.exports = router;
