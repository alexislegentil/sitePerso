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

const HomePage = () => {

  const sounds = [ // Liste des sons à jouer [src, title]
    {src: PierreGuerrier, title: 'PierreGuerrier', color: "rgba(255, 0, 0, 0.5)"},
    {src: PierreBeatBox, title: 'PierreBeatBox', color: "rgba(0, 0, 255, 0.3)"},
    {src: JingleB, title: 'JingleB', color: "rgba(0, 128, 0, 0.5)"},
    {src: sportJingle6, title: 'sportJingle6', color: "rgba(255, 255, 0, 0.5)"},
    {src: sportJingle3, title: 'sportJingle3', color: "rgba(128, 0, 128, 0.5)"}
  ]

    return (
      <DndProvider  backend={HTML5Backend}>
        <SoundProvider>
          <div>
            <h1>Bienvenue sur notre site de musique interactif !</h1>
            <p>Choisissez un son pour commencer :</p>
            <div style={{display:'flex'}}>
            {sounds.map(sound => (
              <SoundPlayer src={sound.src} title={sound.title} color={sound.color} key={sound.title} />
            ))}
            </div>
          </div>
          <div style={{display:'flex'}}>
          <Speaker/>
          <Speaker/>
          <Speaker/>
          <Speaker/>
          </div>
        </SoundProvider>
      </DndProvider>
    );
  
}

export default HomePage;