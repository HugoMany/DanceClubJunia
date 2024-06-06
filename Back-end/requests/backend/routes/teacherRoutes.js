const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

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
 *       400:
 *         description: Entree invalide
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
 *               credit:
 *                 type: integer
 *                 description: Credit initial de l'etudiant.
 *                 example: 0
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
 *       400:
 *         description: Entree invalide
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
 *               credit:
 *                 type: integer
 *                 description: Credit de l'etudiant.
 *                 example: 0
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
 *       400:
 *         description: Entree invalide
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
 *               studentID:
 *                 type: integer
 *                 description: ID de l'etudiant a retirer du cours.
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
 *         description: Entree invalide
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacherID:
 *                 type: integer
 *                 description: ID du professeur responsable de l'affectation.
 *                 example: 1
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
 *         description: Entree invalide
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
 *       400:
 *         description: Requete invalide.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/searchStudent', teacherController.searchStudent);

/**
 * @swagger
 * /api/teacher/cancelCourse:
 *   delete:
 *     summary: Annuler un cours
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacherID:
 *                 type: integer
 *                 description: ID du professeur qui annule le cours.
 *                 example: 1
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
 *         description: champs vide
 *       401:
 *         description: teacherID invalide
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
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date a partir de laquelle on compte le nombre d'etudiants a qui le professeur a fait cours.
 *         example: "2024-01-01"
 *       - in: query
 *         name: endDate
 *         required: true
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
 *         description: Entree invalide
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
 *                 example: 1
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
 *                 example: "ticket,subscription,card"
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
 *                       example: true
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
 *         description: Requête invalide
 *       500:
 *         description: Erreur du serveur
 */
router.patch('/modifyCourse', teacherController.modifyCourse);

module.exports = router;
