import React, { useState, useEffect, createContext, useContext } from 'react';

const SoundContext = createContext({
  isTimerActive: false,
  secondsRemaining: null,
  soundPlaying: [],
  startTimer: () => {},
  pauseTimer: () => {},
  playSound: () => {},
  stopSound: () => {},
});

export const SoundProvider = ({ children }) => {
  const [isTimerActive, setisTimerActive] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(null);
  const [soundPlaying, setSoundPlaying] = useState([]);

  useEffect(() => {
    let intervalId;

    const handleTimer = () => {
      setSecondsRemaining(8); // Commencer le compte à rebours à partir de 8 secondes

      intervalId = setInterval(() => {
        setSecondsRemaining(prevSeconds => {
          if (prevSeconds === 1) {
            clearInterval(intervalId); // Arrêter le timer lorsque le temps est écoulé
           // return 8; // Réinitialiser le compteur à 8 pour le prochain cycle
            handleTimer();
          }
          return prevSeconds - 1; // Décrémenter le nombre de secondes restantes
        });
      }, 1000); // Le timer se répète toutes les secondes
    };

    if (isTimerActive) {
      handleTimer(); // Si le timer est actif, démarrer le timer
    }

    return () => {
      clearInterval(intervalId); // Nettoyage lors du démontage du composant
    };
  }, [isTimerActive]);

  const startTimer = () => {
    setisTimerActive(true); // Activer le timer
  };

  const pauseTimer = () => {
    setisTimerActive(false); // Désactiver le timer
  };

  const playSound = (sound) => {
    console.log('playSound', sound);
    setSoundPlaying([...soundPlaying, sound]);
  };

  const stopSound = (sound) => {
    setSoundPlaying(soundPlaying.filter(s => s !== sound));
  };


  return (
    <SoundContext.Provider value={{ isTimerActive, secondsRemaining, soundPlaying, startTimer, pauseTimer, playSound, stopSound }}>
      {children}
      <div>
      <h1>Timer Component</h1>
      <p>Secondes restantes: {secondsRemaining}</p>
      {isTimerActive ? (
        <button onClick={pauseTimer}>Pause Timer</button>
      ) : (
        <button onClick={startTimer}>Start Timer</button>
      )}
    </div>
    </SoundContext.Provider>
  );
};

export const useTimer = () => useContext(SoundContext);