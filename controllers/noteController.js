const Note = require('../models/note');

exports.createNote = async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      body: req.body.body
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.queryNotesByTitle = async (req, res) => {
  try {
    const notes = await Note.find({ title: new RegExp(req.query.title, 'i') });
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, body: req.body.body },
      { new: true, runValidators: true }
    );
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
