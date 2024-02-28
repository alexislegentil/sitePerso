import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import SpeakerSVG from './SpeakerSVG'; // Assumez que SpeakerSVG est un composant SVG représentant une enceinte de musique

const Speaker = ({ onDrop }) => {
  const [isActive, setIsActive] = useState(false);

  const [{isOver}, drop] = useDrop(() => ({
    accept: 'musicObject',
    drop: (item) => {
     handleSpeakerOn();
     console.log('Dropped on speaker :', item.title);
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
     <SpeakerSVG isActive={isActive} />
    </div>
  );
};

export default Speaker;
