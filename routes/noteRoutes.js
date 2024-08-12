const express = require('express');
const { createNote, getNoteById, queryNotesByTitle, updateNote } = require('../controllers/noteController');
const router = express.Router();

router.post('/notes', createNote);
router.get('/notes/:id', getNoteById);
router.get('/notes', queryNotesByTitle);
router.put('/notes/:id', updateNote);

module.exports = router;
