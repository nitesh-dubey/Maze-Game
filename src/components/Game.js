import React, { useState, useEffect } from "react";
import { generateMaze } from "./generateMaze";
import GameBoard from "./GameBoard";
import "../css/Game.css";

import KeyHandler from "react-key-handler";

const Game = (props) => {
  const [showGameBoard, setShowGameBoard] = useState(false);
  const [boardHeight, setBoardHeight] = useState(0);
  const [boardWidth, setBoardWidth] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({
    x: 0,
    y: 0,
  });
  const [randomPositions, setRandomPositions] = useState([]);
  const [totalMoves, setTotalMoves] = useState(0);
  const [maze, setMaze] = useState(null);
  const [timer, setTimer] = useState(0);

  //let maze = null;

  function getBoardDimensions() {
    let bWidth = prompt("Enter the Board Width");
    if (bWidth > 0) {
      let bHeight = prompt("Enter the Board Height");
      if (bHeight > 0) {
        setBoardHeight((_) => bHeight);
        setBoardWidth((_) => bWidth);
        //generateCollectables();
      } else {
        getBoardDimensions();
      }
    } else {
      getBoardDimensions();
    }
  }

  function generateCollectables() {
    let randomPos = [];
    let randomVals = [];
    let minval = Math.min(boardWidth, boardHeight);
    for (let i = 0; i < Math.ceil(minval / 2); i++) {
      let val = Math.floor(Math.random() * minval);
      if (!randomVals.includes(val)) {
        randomVals.push(val);
      }
    }

    for (let i = 0; i < randomVals.length; i++) {
      for (let j = 0; j < randomVals.length; j++) {
        randomPos.push({
          x: randomVals[i],
          y: randomVals[j],
        });
      }
    }
    setRandomPositions((_) => randomPos);
    //console.log("width : ", boardWidth, "Height : ", boardHeight);
    // if (boardWidth > 0 && boardHeight > 0) {
    //   let _maze = generateMaze(boardWidth, boardHeight);
    //   setMaze(() => _maze);
    // }
    // setShowGameBoard(true);
  }

  function countTotalMoves() {
    setTotalMoves((moves) => moves + 1);
  }

  useEffect(() => {
    getBoardDimensions();
  }, []);

  useEffect(() => {
    if (boardWidth > 0 && boardHeight > 0) {
      generateCollectables();

      //console.log("width : ", boardWidth, "Height : ", boardHeight);
      //let _maze = generateMaze(boardWidth, boardHeight);
      setMaze(() => generateMaze(boardWidth, boardHeight));
    }
  }, [boardWidth, boardHeight]);

  useEffect(() => {
    setShowGameBoard(true);
  }, [maze]);

  //Setting Timer
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleKeyUp = (e) => {
    e.preventDefault();

    if (
      maze[playerPosition.x][playerPosition.y].upBorder === true ||
      Number(playerPosition.x) - 1 < 0
    )
      return;

    setPlayerPosition((prev) => ({ x: Number(prev.x) - 1, y: Number(prev.y) }));

    countTotalMoves();
  };

  const handleKeyDown = (e) => {
    e.preventDefault();

    if (
      maze[playerPosition.x][playerPosition.y].downBorder === true ||
      Number(playerPosition.x) + 1 >= boardHeight
    )
      return;

    setPlayerPosition((prev) => ({ x: Number(prev.x) + 1, y: Number(prev.y) }));

    countTotalMoves();
  };

  const handleKeyLeft = (e) => {
    e.preventDefault();

    if (
      maze[playerPosition.x][playerPosition.y].leftBorder === true ||
      Number(playerPosition.y) - 1 < 0
    )
      return;

    setPlayerPosition((prev) => ({ x: Number(prev.x), y: Number(prev.y) - 1 }));

    countTotalMoves();
  };

  const handleKeyRight = (e) => {
    e.preventDefault();

    if (
      maze[playerPosition.x][playerPosition.y].rightBorder === true ||
      Number(playerPosition.y) + 1 >= boardWidth
    )
      return;

    setPlayerPosition((prev) => ({ x: Number(prev.x), y: Number(prev.y) + 1 }));

    countTotalMoves();
  };

  // console.log(maze);
  // console.log("random Pos : ", randomPositions);
  // console.log("width : ", boardWidth, "height : ", boardHeight);
  // console.log("player pos : ", playerPosition);
  // console.log("total moves : ", totalMoves);

  return (
    <div className="main-container">
      <div>{showGameBoard && <h2>Time : {timer}</h2>}</div>

      <div>{showGameBoard && <h2>Moves : {totalMoves}</h2>}</div>

      <div>
        <KeyHandler keyValue="ArrowUp" onKeyHandle={handleKeyUp} />
        <KeyHandler keyValue="ArrowDown" onKeyHandle={handleKeyDown} />
        <KeyHandler keyValue="ArrowLeft" onKeyHandle={handleKeyLeft} />
        <KeyHandler keyValue="ArrowRight" onKeyHandle={handleKeyRight} />

        {showGameBoard && (
          <GameBoard
            maze={maze}
            randomPositions={randomPositions}
            boardWidth={boardWidth}
            boardHeight={boardHeight}
            totalMoves={totalMoves}
            playerPosition={playerPosition}
            setRandomPositions={setRandomPositions}
          />
        )}
      </div>
      <div>
        <h4>Collect All X !</h4>
      </div>
    </div>
  );
};

export default Game;
