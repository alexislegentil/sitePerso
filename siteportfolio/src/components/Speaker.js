import React, { useEffect, useState } from 'react';
import ReactHowler from 'react-howler'; // Assurez-vous de placer votre fichier sonore dans le même répertoire que ce fichier
import { useTimer } from '../provider/SoundContext.js';
import { useDrop } from 'react-dnd';
import SpeakerSVG from './SpeakerSVG'; // Assumez que SpeakerSVG est un composant SVG représentant une enceinte de musique

const Speaker = () => {
  const [isActive, setIsActive] = useState(false);
  const [color, setColor] = useState("#C0C0C0");
  const [lastItem, setLastItem] = useState(null);

  const { isTimerActive, soundPlaying, secondsRemaining,stockPlayingSounds, startTimer, pauseTimer, playSound, stopSound } = useTimer();
  const [playing, setPlaying] = useState(false);
  const [willPlay, setWillPlay] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    !isActive ? setColor("#C0C0C0") : (lastItem) ? setColor(lastItem.color) : setColor("#C0C0C0");

   if (lastItem !== null) {
      if (playing) {
        // mettre pause
        
        if (soundPlaying.includes(lastItem.title)) {
          stopSound(lastItem.title);
          console.log('stopSound :', lastItem.title);
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
        if (!soundPlaying.includes(lastItem.title)){
          playSound(lastItem.title);
        }
      }
    }
  }, [isActive]);

  useEffect(() => {
    if (lastItem !== null) {
      if (soundPlaying.includes(lastItem.title) && !playing) {
        if (stockPlayingSounds.includes(lastItem.title) && !playing) {
          setPlaying(true);
        } else {  
        setWillPlay(true);}
      }
      else if (!soundPlaying.includes(lastItem.title) && playing) {
        setPlaying(false);
      }
    }
  }, [soundPlaying]);

  useEffect(() => {
    if (willPlay && secondsRemaining === 8) {
      setPlaying(true);
      setWillPlay(false);
    }
  }, [willPlay, secondsRemaining]);

  const [{isOver}, drop] = useDrop(() => ({
    accept: 'musicObject',
    drop: (item) => {
     handleSpeakerOn();
     setLastItem(item);
     setColor(item.color);
     console.log('Dropped on speaker :', item);
    },
  }));

  const handleVolumeChange = e => {
    setVolume(parseFloat(e.target.value));
  };
  
  const handleSpeakerOn = () => {
    // Gérer l'événement lorsqu'on survole l'enceinte
    setIsActive(true);
  };

  const handleSpeakerClick = () => {
    // Gérer l'événement lorsqu'on clique sur l'enceinte
    setIsActive(!isActive);
  };

  const handleSpeakerStop = () => {
    stopSound(lastItem.title);
    setLastItem(null);
    setIsActive(false);
  }


  return (
    <div ref={drop}>
      <div onClick={handleSpeakerClick}>
      <SpeakerSVG isActive={isActive} color={color} />
      </div>
      {lastItem ? (
        <div>
          <ReactHowler
            src={lastItem.soundFile}
            playing={playing}
            volume={volume} 
            loop={true}
          />
          <div>
            {isActive ? (
              <>
                <button onClick={handleSpeakerStop}>X</button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Speaker;
