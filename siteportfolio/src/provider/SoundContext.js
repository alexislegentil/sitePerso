import React, { useState, useEffect, createContext, useContext } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PauseSVG from '../components/pauseSVG';
import PlaySVG from '../components/playSVG';

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

  useEffect
  (() => {
    if (soundPlaying == []) {
      secondsRemaining(8);   }
  }, [soundPlaying]);

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
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div style={{ width: 200, height: 200 }}>
          <CircularProgressbarWithChildren 
          value={secondsRemaining} 
          maxValue={8} 
         // text={`${secondsRemaining}`} 
          styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          rotation: 0.25,

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'butt',

          // Text size
          textSize: '16px',

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          pathColor: `rgba(62, 152, 199, 1)`,
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}>
          <div style={{ fontSize: 12, marginTop: -5 }}>
            {isTimerActive ? (
              <div onClick={pauseTimer}>
                <PauseSVG />
              </div>
              ) : (
                <div onClick={startTimer}>
                <PlaySVG />
              </div>
              )}
          </div>
        </CircularProgressbarWithChildren>
        </div>
      </div>
    </SoundContext.Provider>
  );
};

export const useTimer = () => useContext(SoundContext);