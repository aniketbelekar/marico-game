import React, { useState, useEffect } from 'react';
import './App.css';

const Mario = ({ position }) => {
  return (
    <div
      className="mario"
      style={{ left: `${position.x}px`, bottom: `${position.y}px` }}
    />
  );
};

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted && e.key === 'Enter') {
        setGameStarted(true);
      }
      if (gameStarted) {
        if (e.key === 'ArrowRight') {
          setPosition((prevPos) => ({ ...prevPos, x: prevPos.x + 10 }));
        } else if (e.key === 'ArrowLeft') {
          setPosition((prevPos) => ({ ...prevPos, x: prevPos.x - 10 }));
        } else if (e.key === 'Space' && !isJumping) {
          setIsJumping(true);
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, isJumping]);

  const jump = () => {
    let jumpCount = 0;
    const jumpInterval = setInterval(() => {
      setPosition((prevPos) => ({ ...prevPos, y: prevPos.y + 5 }));
      jumpCount += 5;
      if (jumpCount >= 100) {
        clearInterval(jumpInterval);
        fall();
      }
    }, 20);
  };

  const fall = () => {
    let fallCount = 0;
    const fallInterval = setInterval(() => {
      setPosition((prevPos) => ({ ...prevPos, y: prevPos.y - 5 }));
      fallCount += 5;
      if (fallCount >= 100) {
        clearInterval(fallInterval);
        setIsJumping(false);
        setPosition((prevPos) => ({ ...prevPos, y: 0 }));
      }
    }, 20);
  };

  return (
    <div className="game-container" tabIndex="0">
      {!gameStarted && (
        <div className="start-message">Press Enter to start the game</div>
      )}
      {gameStarted && <Mario position={position} />}
    </div>
  );
};

export default App;
