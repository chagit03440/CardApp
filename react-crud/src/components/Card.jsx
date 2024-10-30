import React, { useState, useEffect } from 'react';
import Colors from './Colors';

function Card({ text, backgroundColor, onDelete, onUpdate }) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [cardBackground, setCardBackground] = useState(backgroundColor);
  const [editableText, setEditableText] = useState(text);

  useEffect(() => {
    setCardBackground(backgroundColor); 
  }, [backgroundColor]);

  useEffect(() => {
    setEditableText(text);
  }, [text]);

  const toggleColorPicker = () => {

    setIsPickerOpen(!isPickerOpen);
  };

  const handleColorChange = (color) => {
    setCardBackground(color);
    setIsPickerOpen(false);
    onUpdate({ backColor: color });
  };

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setEditableText(newText);
    onUpdate({ text: newText }); // Update the text on the server
  };


  return (
    <div className="card" style={{ backgroundColor: cardBackground }}>
        <div className='cardInput'>
            <input className="cardText"
            type="text"
            value={editableText}
            onChange={handleTextChange}
            />
        </div>
        <div className='cardBottom'>
        {!isPickerOpen && (
          <>
          <div className='bottomBtns'>
            <div
                className="colorCircle"
                style={{ backgroundColor: cardBackground }}
                onClick={toggleColorPicker}
            ></div>
            <button className="deleteBtn" onClick={onDelete}>
                <i className="fas fa-trash" style={{ color: 'white' }}></i>
            </button>
          </div>
          </>
        )}
         {isPickerOpen && <Colors onColorSelect={handleColorChange} />}
      </div>
    </div>
  );
}

export default Card;
