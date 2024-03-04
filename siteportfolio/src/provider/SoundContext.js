import React, { useState, useEffect, createContext, useContext } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

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
  const [stockPlayingSounds, setStockPlayingSounds] = useState([]);

  useEffect(() => {
    let intervalId;

    const handleTimer = () => {
      if (secondsRemaining === null) {
        setSecondsRemaining(8); // Start the countdown from 8 seconds
      }
    
      intervalId = setInterval(() => {
        setSecondsRemaining(prevSeconds => {
          if (prevSeconds <= 1) {
            return 8; // Reset the countdown when time is up
          }
          return prevSeconds - 1; // Decrement the remaining seconds
        });
      }, 1000); // The timer repeats every second
    };

    if (isTimerActive) {
      handleTimer(); // Si le timer est actif, démarrer le timer
    }

    return () => {
      clearInterval(intervalId); // Nettoyage lors du démontage du composant
    };
  }, [isTimerActive]);

  const pauseTimer = async () => {
    
    if (soundPlaying.length > 0) {
      console.log('soundPlaying', soundPlaying);
      setStockPlayingSounds(soundPlaying);
      for (const sound of soundPlaying) {
        console.log('sound', sound);
        await stopSound(sound);
      }
    }
    setisTimerActive(false); // Désactiver le timer
    console.log('soundPlay', soundPlaying);
  };

  const startTimer = () => {
    console.log(soundPlaying);
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
    
    setSoundPlaying(soundPlaying.filter(s => s !== sound));
    console.log('stopSound', sound);
  };


  return (
    <SoundContext.Provider value={{ isTimerActive, secondsRemaining, soundPlaying, stockPlayingSounds, startTimer, pauseTimer, playSound, stopSound }}>
      {children}
      <div>
      <CountdownCircleTimer
        isPlaying={isTimerActive}
        duration={8}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        onComplete={() => {
          // do your stuff here
          return { shouldRepeat: true } // repeat animation in 1.5 seconds
        }}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
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