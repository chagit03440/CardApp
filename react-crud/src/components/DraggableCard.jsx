import {useDrag, useDrop } from 'react-dnd';
import Card from './Card'; 
const ItemType = 'CARD';

const DraggableCard = ({ card, index, moveCard, onDelete, onUpdate }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemType,
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
          if (draggedItem.index !== index) {
            moveCard(draggedItem.index, index);
            draggedItem.index = index; // Only set this after moveCard to ensure updates align
          }
        },
      });
  
    return (
      <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <Card
          text={card.text}
          backgroundColor={card.backColor}
          onDelete={() => onDelete(card.id)}
          onUpdate={(updatedData) => onUpdate({ id: card.id, ...updatedData })}
        />
      </div>
    );
  };
  
  export default DraggableCard;