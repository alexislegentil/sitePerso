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
  var stockPlayingSounds = [];

  useEffect(() => {
    let intervalId;

    const handleTimer = () => {
      if (secondsRemaining === null) {
        setSecondsRemaining(8); // Commencer le compte à rebours à partir de 8 secondes
      }

      intervalId = setInterval(async () => {
        setSecondsRemaining(prevSeconds => {
          if (prevSeconds === 1) {
            clearInterval(intervalId); // Arrêter le timer lorsque le temps est écoulé
            setSecondsRemaining(8); 
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

  const pauseTimer = async () => {
    setisTimerActive(false); // Désactiver le timer
    if (soundPlaying.length > 0) {
      console.log('soundPlaying', soundPlaying);
      stockPlayingSounds = soundPlaying;
      for (const sound of soundPlaying) {
        console.log('sound', sound);
        await stopSound(sound);
      }
    }
  };

  const startTimer = () => {
    setisTimerActive(true); // Activer le timer
    console.log('stockPlayingSounds', stockPlayingSounds);
    if (stockPlayingSounds && stockPlayingSounds.length > 0) {
      stockPlayingSounds.forEach(sound => {
        playSound(sound);
      });
    }
  };


  const playSound = (sound) => {
    console.log('playSound', sound);
    setSoundPlaying([...soundPlaying, sound]);
  };

  const stopSound = async (sound) => {
    console.log('stopSound', sound);
    await setSoundPlaying(soundPlaying.filter(s => s !== sound));
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