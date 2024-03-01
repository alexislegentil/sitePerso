import React, { useState, useEffect } from 'react';
import ReactHowler from 'react-howler'; // Assurez-vous de placer votre fichier sonore dans le même répertoire que ce fichier
import { useTimer } from '../provider/SoundContext.js';
import { useDrag } from 'react-dnd';
import '../css/SoundPlayer.css';

const SoundPlayer = (props) => {
  const soundFile = props.src; // Le fichier sonore à jouer
  const title = props.title; // Le titre du fichier sonore
  const color = props.color; 

  const { isTimerActive, secondsRemaining, soundPlaying, startTimer, pauseTimer, isSoundPlaying, playSound, stopSound } = useTimer();

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'musicObject',
    item: { title, soundFile, color, setPlaying},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
   
  useEffect(() => {
    if (soundPlaying.includes(title) && !playing) {
      setPlaying(true);
    }
    else if (!soundPlaying.includes(title) && playing) {
      setPlaying(false);
    }
  }, [soundPlaying]);


  const handleVolumeChange = e => {
    setVolume(parseFloat(e.target.value));
  };

  const playPause = () => { 
    if (playing) {
      // mettre pause
      
      if (soundPlaying.includes(title)) {
        stopSound(title);
      }
      if (soundPlaying.length === 1) {
        if (isTimerActive) {
          pauseTimer();
        }
      }
    }
    else {
      // mettre play
      if (!isTimerActive) {
        startTimer();
      }
      if (!soundPlaying.includes(title)){
        playSound(title);
      }
    }
   
  }

  return (
    <div className="sound-player-container" ref={drag} style={{ backgroundColor: color }}>
      <h1>{title}</h1>
      <button onClick={() => playPause()}>
        {playing ? "Stop" : "Jouer"} {title}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
      <ReactHowler
        src={soundFile}
        playing={playing}
        volume={volume} 
        loop={true}
      />
    </div>
  );
};

export default SoundPlayer;
