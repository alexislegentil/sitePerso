import React, { useState, useEffect } from 'react';
import { useTimer } from '../provider/SoundContext.js';
import { useDrag } from 'react-dnd';
import '../css/SoundPlayer.css';

const SoundPlayer = (props) => {
  const soundFile = props.src; // Le fichier sonore à jouer
  const title = props.title; // Le titre du fichier sonore
  const color = props.color; 

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'musicObject',
    item: { title, soundFile, color},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className="sound-player-container" ref={drag} style={{ backgroundColor: color }}>
      <h1>{title}</h1>

    </div>
  );
};

export default SoundPlayer;
