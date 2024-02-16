import React, {useState} from 'react';
import SoundPlayer from '../components/SoundPlayer';
import PierreGuerrier from '../sounds/PierreGuerrier.m4a';
import PierreBeatBox from '../sounds/PierreBeatBox.m4a';
import { TimerProvider, useTimer } from '../provider/TimerContext.js';

const HomePage = () => {

    return (
      <TimerProvider>
        <div>
          <h1>Bienvenue sur notre site de musique interactif !</h1>
          <p>Choisissez un son pour commencer :</p>
          <SoundPlayer src={PierreGuerrier} title='PierreGuerrier' />
          <SoundPlayer src={PierreBeatBox} title='PierreBeatBox' />
        </div>
      </TimerProvider>
    );
  
}

export default HomePage;