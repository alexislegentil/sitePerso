import React, { useState, useEffect, useContext, createContext } from 'react';

const TimerComponent = () => {

  const isTimer = createContext(false);

  const [secondsRemaining, setSecondsRemaining] = useState(null);

  useEffect(() => {
    let intervalId;

    const handleTimer = () => {
      setSecondsRemaining(8); // Commencer le compte à rebours à partir de 8 secondes

      intervalId = setInterval(() => {
        setSecondsRemaining(prevSeconds => {
          if (prevSeconds === 1) {
            clearInterval(intervalId); // Arrêter le timer lorsque le temps est écoulé
            startTimer(); // Redémarrer le timer
            return 8; // Réinitialiser le compteur à 8 pour le prochain cycle
          }
          return prevSeconds - 1; // Décrémenter le nombre de secondes restantes
        });
      }, 1000); // Le timer se répète toutes les secondes
    };

    if (startTimer) {
      handleTimer(); // Si la fonction startTimer est fournie, démarrer le timer
    }

    return () => {
      clearInterval(intervalId); // Nettoyage lors du démontage du composant
    };
  }, [startTimer]);

  return (
    <div>
      <h1>Timer Component</h1>
      <p>Secondes restantes: {secondsRemaining}</p>
    </div>
  );
};

export default TimerComponent;
