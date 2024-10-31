import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableCard from './DraggableCard';

const Cards = () => {
  const [cards, setCards] = useState([]);
  axios.defaults.baseURL = 'http://localhost:5000';

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('/cards');
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
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
  const updateCards = async (updatedCards) => {
    try {
      await axios.put(`/cards`, updatedCards);
    } catch (error) {
      console.error('Error updating cards:', error);
    }
  };
  const moveCard = (fromIndex, toIndex) => {
    if (fromIndex !== toIndex) { 
      const updatedCards = Array.from(cards);
      const [movedCard] = updatedCards.splice(fromIndex, 1);
      updatedCards.splice(toIndex, 0, movedCard);
      setCards(updatedCards);
      updateCards(updatedCards); 
    }
  };
  

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="cardsContainer">
        {cards.map((card, index) => (
          <DraggableCard
            key={card.id}
            card={card}
            index={index}
            moveCard={moveCard}
            onDelete={deleteCard}
            onUpdate={updateCard}
          />
        ))}
        <div className="addCard">
          <button className="addCardBtn" onClick={addNewCard}>+</button>
        </div>
      </div>
    </DndProvider>
  );
};

export default Cards;
