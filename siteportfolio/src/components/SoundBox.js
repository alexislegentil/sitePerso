import React, { useEffect } from 'react';

function SoundBox({ soundFile }) {
  useEffect(() => {
    // Créez un nouvel AudioContext
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Chargez le fichier sonore dans un AudioBuffer
    fetch(soundFile)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        // Créez un AudioBufferSourceNode
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;

        // Connectez le AudioBufferSourceNode à la destination
        source.connect(audioContext.destination);

        // Jouez le son
        source.start();
      });

    // Nettoyez l'AudioContext lorsque le composant est démonté
    return () => {
      audioContext.close();
    };
  }, [soundFile]); // Exécutez à nouveau l'effet si le fichier sonore change

  return <div>Playing sound: {soundFile}</div>;
}

export default SoundBox;