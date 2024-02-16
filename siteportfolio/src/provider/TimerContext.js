import React, { useState, useEffect, createContext, useContext } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(null);

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

    if (isActive) {
      handleTimer(); // Si le timer est actif, démarrer le timer
    }

    return () => {
      clearInterval(intervalId); // Nettoyage lors du démontage du composant
    };
  }, [isActive]);

  const startTimer = () => {
    setIsActive(true); // Activer le timer
  };

  const pauseTimer = () => {
    setIsActive(false); // Désactiver le timer
  };

  return (
    <TimerContext.Provider value={{ isActive, secondsRemaining, startTimer, pauseTimer }}>
      {children}
      <div>
      <h1>Timer Component</h1>
      <p>Secondes restantes: {secondsRemaining}</p>
      {isActive ? (
        <button onClick={pauseTimer}>Pause Timer</button>
      ) : (
        <button onClick={startTimer}>Start Timer</button>
      )}
    </div>
    </TimerContext.Provider>
  );
};

const useTimer = () => useContext(TimerContext);


export default useTimer;
