import React, { useEffect, useState } from 'react';
import Card from './Card'; // Assuming you have the Card component in the same folder
import axios from 'axios';

const Cards = () => {
  const [cards, setCards] = useState([]);

  axios.defaults.baseURL = 'http://localhost:5000';

  const fetchCards = async () => {
    try {
      const response = await axios.get('/cards');
      setCards(response.data); // Update cards with data from the server
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  useEffect(() => {
    fetchCards(); 
  }, []);

  const addNewCard = async () => {
    const newCard = { text: `Card ${cards.length + 1}`, backColor: 'lightgrey' };
    try {
      const response = await axios.post('/cards', newCard);
      setCards([...cards, response.data]);
    } catch (error) {
      console.error('Error adding new card:', error);
    }
  };

  const deleteCard = async (id) => {
    try {
      await axios.delete(`/cards/${id}`);
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const updateCard = async (updatedCard) => {
    try {
      await axios.put(`/cards/${updatedCard.id}`, updatedCard);
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === updatedCard.id ? { ...card, ...updatedCard } : card
        )
      );
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  return (
    <div className="cardsContainer">
      {cards.map((card) => (
        <Card
          key={card.id}
          text={card.text}
          backgroundColor={card.backColor}
          onDelete={() => deleteCard(card.id)}
          onUpdate={(updatedData) => updateCard({ id: card.id, ...updatedData })}
        />
      ))}
      <div className="addCard">
        <button className="addCardBtn" onClick={addNewCard}>+</button>
      </div>
    </div>
  );
};

export default Cards;
