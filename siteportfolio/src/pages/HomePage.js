import React, {useState} from 'react';
import SoundPlayer from '../components/SoundPlayer';
import PierreGuerrier from '../assets/audio/PierreGuerrier.mp3';
import PierreBeatBox from '../assets/audio/PierreBeatBox.mp3';
import JingleB from '../assets/audio/JingleB.mp3';
import sportJingle6 from '../assets/audio/sport-jingle6.mp3';
import sportJingle3 from '../assets/audio/sport-jingle3.mp3';
import { SoundProvider, useTimer } from '../provider/SoundContext.js';

const HomePage = () => {

    return (
      <SoundProvider>
        <div>
          <h1>Bienvenue sur notre site de musique interactif !</h1>
          <p>Choisissez un son pour commencer :</p>
          <SoundPlayer src={PierreGuerrier} title='PierreGuerrier' />
          <SoundPlayer src={PierreBeatBox} title='PierreBeatBox' />
          <SoundPlayer src={JingleB} title='JingleB' />
          <SoundPlayer src={sportJingle6} title='sportJingle6' />
          <SoundPlayer src={sportJingle3} title='sportJingle3' />
        </div>
      </SoundProvider>
    );
  
}

export default HomePage;