// routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Obtener todos los libros
router.get('/', async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
});

// Agregar un nuevo libro
router.post('/', async (req, res) => {
  const { title, author, status, comment } = req.body;
  const newBook = new Book({ title, author, status, comment });
  await newBook.save();
  res.status(201).json(newBook);
});

// Actualizar un libro existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedBook) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar el libro' });
  }
});

// Eliminar un libro
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json({ message: 'Libro eliminado' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar el libro' });
  }
});

module.exports = router;