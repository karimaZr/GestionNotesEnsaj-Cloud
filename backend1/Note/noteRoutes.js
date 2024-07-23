const express = require('express');
const router = express.Router();
const noteController = require('./noteController');

// Routes pour les notes
router.post('/', noteController.createNote);
router.get('/', noteController.getAllNotes);
router.get('/:id', noteController.getNoteById);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.get('/etudiants/:cne/note', noteController.getNotesByEtudiantCNE);
router.get('/:elementModuleCode/notes', noteController.getNotesForElementModule);
router.get('/etudiants/:cne/elementmodule/:elementModuleCode/note', noteController.getNoteByEtudiantCNEEtModule);
router.get('/notes/:elementModuleCode/:AnneeUniversitaire', noteController.getNotesByElementModuleCodeetAnnee);

module.exports = router;
