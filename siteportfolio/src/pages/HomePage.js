import React, { useEffect } from 'react';
import { Howl } from 'howler';

const sounds = [
  { src: 'chemin/vers/son1.mp3', startDelay: 0 },
  { src: 'chemin/vers/son2.mp3', startDelay: 1000 }, // Exemple d'un son avec un délai de démarrage
  // Ajoutez d'autres sons avec leurs chemins et délais de démarrage ici
];

const loopDuration = 8000; // Durée d'une boucle en millisecondes (8 secondes)

const App = () => {
  useEffect(() => {
    const playSoundsInLoop = () => {
      sounds.forEach(({ src, startDelay }) => {
        const sound = new Howl({ src, loop: true });
        setTimeout(() => {
          sound.play();
        }, startDelay);
      });

      setTimeout(playSoundsInLoop, loopDuration);
    };

    playSoundsInLoop();

    // Nettoyer les ressources lors du démontage du composant
    return () => {
      sounds.forEach(({ src }) => {
        const sound = new Howl({ src });
        sound.unload();
      });
    };
  }, []);

  return <div>Composition audio en boucle</div>;
};

export default App;
