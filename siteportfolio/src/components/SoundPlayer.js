import React, { useState } from 'react';
import ReactHowler from 'react-howler'; // Assurez-vous de placer votre fichier sonore dans le même répertoire que ce fichier

const SoundPlayer = (props) => {
  const soundFile = props.src; // Le fichier sonore à jouer
  const title = props.title; // Le titre du fichier sonore

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const handleVolumeChange = e => {
    setVolume(parseFloat(e.target.value));
  };

  const playPause = () => { 
    setPlaying(!playing);
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
