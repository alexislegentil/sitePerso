import React, {useState} from 'react';
import SoundPlayer from '../components/SoundPlayer';
import PierreGuerrier from '../assets/audio/PierreGuerrier.mp3';
import PierreBeatBox from '../assets/audio/PierreBeatBox.mp3';
import JingleB from '../assets/audio/JingleB.mp3';
import sportJingle6 from '../assets/audio/sport-jingle6.mp3';
import sportJingle3 from '../assets/audio/sport-jingle3.mp3';
import { SoundProvider, useTimer } from '../provider/SoundContext.js';
import Speaker from '../components/Speaker.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import beatMe from '../assets/audio/beat-me.wav';
import beatboxDrum from '../assets/audio/beatbox-drum-loop.wav';
import classicalViolin from '../assets/audio/classical-violin-melody.wav';
import descend from '../assets/audio/descend.wav';
import fat808 from '../assets/audio/fat-808-bass.wav';
import freeFall from '../assets/audio/free-fall.wav';
import hipHopSteelDrums1 from '../assets/audio/hip-hop-steel-drums-1.wav';
import hipHopSteelDrums2 from '../assets/audio/hip-hop-steel-drums-2.wav';
import italianOldViolin from '../assets/audio/italian-night-old-violin.wav';
import jammiez from '../assets/audio/jammiez.wav';
import melody2 from '../assets/audio/melody-part-2-of-3.wav';
import narcos from '../assets/audio/narcos.wav';
import phonkMelody from '../assets/audio/phonk-melody.wav';
import pianoMelody from '../assets/audio/piano-melody.wav';
import rhythmicNoise120 from '../assets/audio/rhythmic-noise-120.wav';
import hipHopPercussion120bpm from '../assets/audio/hip-hop-percussion-120-bpm.wav';
import smoothBassForBeats from '../assets/audio/smooth-bass-for-beats.wav';
import steelDrumBeach from '../assets/audio/steel-drum-beach.wav';
import supremo from '../assets/audio/supremo.wav';
import travisScott from '../assets/audio/travis-scott-x-gunna-keychain.wav';
import violin from '../assets/audio/violin.wav';
import vocoder from '../assets/audio/vocoder.wav'; 

const HomePage = () => {

  const sounds = [ // Liste des sons à jouer [src, title]
    {src: PierreGuerrier, title: 'PierreGuerrier', color: "rgba(255, 0, 0, 0.5)"},
    {src: PierreBeatBox, title: 'PierreBeatBox', color: "rgba(0, 0, 255, 0.3)"},
    {src: beatMe, title: 'beatMe', color: "rgba(255, 0, 0, 0.5)"},
    {src: beatboxDrum, title: 'beatboxDrum', color: "rgba(0, 0, 255, 0.3)"},
    {src: classicalViolin, title: 'classicalViolin', color: "rgba(0, 128, 0, 0.5)"},
    {src: descend, title: 'descend', color: "rgba(255, 255, 0, 0.5)"},
    {src: fat808, title: 'fat808', color: "rgba(128, 0, 128, 0.5)"},
    {src: freeFall, title: 'freeFall', color: "rgba(255, 0, 0, 0.5)"},
    {src: hipHopSteelDrums1, title: 'hipHopSteelDrums1', color: "rgba(0, 0, 255, 0.3)"},
    {src: hipHopSteelDrums2, title: 'hipHopSteelDrums2', color: "rgba(0, 128, 0, 0.5)"},
    {src: italianOldViolin, title: 'italianOldViolin', color: "rgba(255, 255, 0, 0.5)"},
    {src: jammiez, title: 'jammiez', color: "rgba(128, 0, 128, 0.5)"},
    {src: melody2, title: 'melody2', color: "rgba(255, 0, 0, 0.5)"},
    {src: narcos, title: 'narcos', color: "rgba(0, 0, 255, 0.3)"},
    {src: phonkMelody, title: 'phonkMelody', color: "rgba(0, 128, 0, 0.5)"},
    {src: pianoMelody, title: 'pianoMelody', color: "rgba(255, 255, 0, 0.5)"},
    {src: rhythmicNoise120, title: 'rhythmicNoise120', color: "rgba(128, 0, 128, 0.5)"},
    {src: hipHopPercussion120bpm, title: 'hipHopPercussion120bpm', color: "rgba(255, 0, 0, 0.5)"},
    {src: smoothBassForBeats, title: 'smoothBassForBeats', color: "rgba(0, 0, 255, 0.3)"},
    {src: steelDrumBeach, title: 'steelDrumBeach', color: "rgba(0, 128, 0, 0.5)"},
    {src: violin, title: 'violin', color: "rgba(255, 0, 0, 0.5)"},

  ]

  const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'Madimi One, sans-serif',
      fontWeight: 400,
      fontStyle: 'normal',
      
    },
    heading: {
      fontSize: '28px',
      marginBottom: '20px',
    },
    paragraph: {
      fontSize: '18px',
      marginBottom: '20px',
    },
    soundPlayerContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: '20px',
      gap: '1em',
    },
    speakerContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  };

    return (
      <DndProvider  backend={HTML5Backend}>
        <SoundProvider>
        <div style={styles.container}>
      <h1 style={styles.heading}>Bienvenue sur MelodyLab !</h1>
      <p style={styles.paragraph}>Choisissez un son pour commencer, puis glissez-le sur l'un des haut-parleurs disponibles</p>
      <div style={styles.soundPlayerContainer}>
        {sounds.map(sound => (
          <SoundPlayer src={sound.src} title={sound.title} color={sound.color} key={sound.title} />
        ))}
      </div>
      <div style={styles.speakerContainer}>
        {[...Array(8)].map((_, index) => (
          <Speaker key={index} />
        ))}
      </div>
    </div>
        </SoundProvider>
      </DndProvider>
    );
    
}

export default HomePage;