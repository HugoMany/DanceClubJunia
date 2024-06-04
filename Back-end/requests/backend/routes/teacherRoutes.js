const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: API pour la gestion des enseignants et de leurs cours
 */

/**
 * @swagger
 * /api/teacher/getStudent:
 *   get:
 *     summary: Récupérer un étudiant par son ID
 *     tags: [Teacher]
 *     parameters:
 *       - in: query
 *         name: studentID
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de l'étudiant
 *           example: 123
 *     responses:
 *       200:
 *         description: Étudiant récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 Student:
 *                   type: array
 *                   properties:
 *                     firstname:
 *                       type: string
 *                     surname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     connectionMethod:
 *                       type: string
 *                     credit:
 *                       type: integer
 *       400:
 *         description: Entrée invalide
 *       500:
 *         description: Erreur SQL
 */
router.get('/getStudent', teacherController.getStudent);

/**
 * @swagger
 * /api/teacher/newStudent:
 *   post:
 *     summary: Créer un nouvel étudiant
 *     tags: [Teacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               connectionMethod:
 *                 type: string
 *               credit:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Étudiant créé avec succès
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
 *                 firstname:
 *                   type: string
 *                 surname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 connectionMethod:
 *                   type: string
 *                 credit:
 *                   type: integer
 *       400:
 *         description: Entrée invalide
 *       500:
 *         description: Erreur SQL
 */
router.post('/newStudent', teacherController.newStudent);

/**
 * @swagger
 * /api/teacher/modifyStudent:
 *   patch:
 *     summary: Modifier les détails d'un étudiant
 *     tags: [Teacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentID:
 *                 type: integer
 *               firstname:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               connectionMethod:
 *                 type: string
 *               credit:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Étudiant modifié avec succès
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
 *                 firstname:
 *                   type: string
 *                 surname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 connectionMethod:
 *                   type: string
 *                 credit:
 *                   type: integer
 *       400:
 *         description: Entrée invalide
 *       500:
 *         description: Erreur SQL
 */
router.patch('/modifyStudent', teacherController.modifyStudent);

/**
 * @swagger
 * /api/teacher/removeStudent:
 *   patch:
 *     summary: Retirer un étudiant d'un cours
 *     tags: [Teacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Étudiant retiré avec succès
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
 *         description: Entrée invalide
 *       500:
 *         description: Erreur SQL
 */
router.patch('/removeStudent', teacherController.removeStudent);

/**
 * @swagger
 * /api/teacher/cancelCourse:
 *   delete:
 *     summary: Annuler un cours
 *     tags: [Teacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacherID:
 *                 type: integer
 *               courseID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cours annulé avec succès
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
 *         description: Entrée invalide
 *       500:
 *         description: Erreur SQL
 */
router.delete('/cancelCourse', teacherController.cancelCourse);

module.exports = router;
