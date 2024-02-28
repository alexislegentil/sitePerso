import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import SpeakerSVG from './SpeakerSVG'; // Assumez que SpeakerSVG est un composant SVG représentant une enceinte de musique

const Speaker = ({ onDrop }) => {
  const [isActive, setIsActive] = useState(false);

  const [, drop] = useDrop({
    accept: 'musicObject',
    drop: (item, monitor) => {
      // Exécuter une fonction de traitement lorsqu'un objet est déposé sur l'enceinte
      onDrop(item);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

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
