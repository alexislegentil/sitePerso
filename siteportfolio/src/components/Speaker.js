import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import SpeakerSVG from './SpeakerSVG'; // Assumez que SpeakerSVG est un composant SVG représentant une enceinte de musique

const Speaker = ({ onDrop }) => {
  const [isActive, setIsActive] = useState(false);
  const [color, setColor] = useState("#C0C0C0");
  const [lastItem, setLastItem] = useState(null);

  useEffect(() => {
    !isActive ? setColor("#C0C0C0") : (lastItem) ? setColor(lastItem.color) : setColor("#C0C0C0");

   if (isActive && lastItem !== null) { lastItem.setPlaying(true)} else if (lastItem !== null) { lastItem.setPlaying(false) }
  }, [isActive]);

  const [{isOver}, drop] = useDrop(() => ({
    accept: 'musicObject',
    drop: (item) => {
     handleSpeakerOn();
     setLastItem(item);
     setColor(item.color);
     console.log('Dropped on speaker :', item);
    },
  }));

  const handleSpeakerOn = () => {
    // Gérer l'événement lorsqu'on survole l'enceinte
    setIsActive(true);
  };

  const handleSpeakerClick = () => {
    // Gérer l'événement lorsqu'on clique sur l'enceinte
    setIsActive(!isActive);
  };

  return (
    <div ref={drop} onClick={handleSpeakerClick}>
     <SpeakerSVG isActive={isActive} color={color} />
    </div>
  );
};

export default Speaker;
