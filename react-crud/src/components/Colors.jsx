import React from 'react';

const colorsArr = ['#A1C6E7', '#B2E1B4', '#FFB2A1', '#D1B2E1'];

function Colors({ onColorSelect }) {
  return (
    <div className="colorPicker">
      {colorsArr.map((color) => (
        <div
          key={color}
          className="colorSwatch"
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect(color)}
        ></div>
      ))}
    </div>
  );
}

export default Colors;
