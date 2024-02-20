import React, { useState } from 'react';
import ReactHowler from 'react-howler'; // Assurez-vous de placer votre fichier sonore dans le même répertoire que ce fichier
import { useTimer } from '../provider/SoundContext.js';

const SoundPlayer = (props) => {
  const soundFile = props.src; // Le fichier sonore à jouer
  const title = props.title; // Le titre du fichier sonore

  const { isTimerActive, secondsRemaining, soundPlaying, startTimer, pauseTimer, isSoundPlaying, playSound, stopSound } = useTimer();

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

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
      setPlaying(false);
    }
    else {
      // mettre play
      if (!isTimerActive) {
        startTimer();
      }
      if (!soundPlaying.includes(title)){
      
        playSound(title);
      }
      setPlaying(true);
    }
   
  }

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={() => playPause()}>{playing ? "Stop" : "Jouer"} {title}</button>
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
        volume={volume} // Volume contrôlé par l'état
        loop={true}
      />
    </div>
  );
};

export default SoundPlayer;
