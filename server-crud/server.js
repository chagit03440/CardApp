// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Sample card data
let cards = [
  { id: 1, text: "card1", backColor: "white" },
  { id: 2, text: "card2", backColor: "red" },
];

// Middleware
app.use(cors());
app.use(express.json());

// Get all cards
app.get('/cards', (req, res) => {
  res.json(cards);
});

// Get a specific card by ID
app.get('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (card) {
    res.json(card);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});

// Add a new card
app.post('/cards', (req, res) => {
  const { text, backColor } = req.body;
  if (text && backColor) {
    const newCard = {
      id: cards.length ? cards[cards.length - 1].id + 1 : 1,
      text,
      backColor
    };
    cards.push(newCard);
    res.status(201).json(newCard);
  } else {
    res.status(400).json({ message: 'text and backColor are required' });
  }
});

// Update a card by ID
app.put('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (card) {
    const { text, backColor } = req.body;
    card.text = text || card.text;
    card.backColor = backColor || card.backColor;
    res.json(card);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});

// Delete a card by ID
app.delete('/cards/:id', (req, res) => {
  const cardIndex = cards.findIndex(c => c.id === parseInt(req.params.id));
  if (cardIndex !== -1) {
    const deletedCard = cards.splice(cardIndex, 1);
    res.json(deletedCard);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
