import React, { useState } from 'react';
import ReactHowler from 'react-howler';
import soundFile from '../sounds/PierreGuerrier.m4a'; // Assurez-vous de placer votre fichier sonore dans le même répertoire que ce fichier

const HomePage = () => {
  const [playing, setPlaying] = useState(false);

  const playPause = () => {
    setPlaying(!playing);
  }

  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={() => playPause()}>{playing ? "Stop" : "Jouer"} PierreGuerrier</button>
      <ReactHowler
        src={soundFile}
        playing={playing}  
        loop={true}
      />
    </div>
  );
};

export default HomePage;
