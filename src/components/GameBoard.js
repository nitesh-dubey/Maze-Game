import React, { useState, useEffect } from "react";

const GameBoard = (props) => {
  //{maze, randomPositions, boardWidth, boardHeight, totalMoves, playerPosition} = props;

  // console.log(props.maze);
  // console.log("random Pos : ", props.randomPositions);
  // console.log("width : ", props.boardWidth, "height : ", props.boardHeight);
  // console.log("player pos : ", props.playerPosition);
  // console.log("total moves : ", props.totalMoves);

  const [randomPosLen, setRandomPosLen] = useState(
    props.randomPositions.length
  );

  useEffect(() => {
    setRandomPosLen(props.randomPositions.length);
  }, [props.randomPositions]);

  useEffect(() => {
    if (props.maze && randomPosLen === 0) {
      alert("Game Completed");
      window.location.reload();
    }
  }, [randomPosLen]);

  if (!props.maze) {
    return <h1>Loading...</h1>;
  }
  console.log(props);

  function handleCellContent(x, y) {
    if (props.playerPosition.x === x && props.playerPosition.y === y) {
      let collectablePos = props.randomPositions.find(
        (pos) =>
          pos.x === props.playerPosition.x && pos.y === props.playerPosition.y
      );

      if (collectablePos) {
        props.setRandomPositions((prevArray) => {
          return prevArray.filter((pos) => pos != collectablePos);
        });
      }

      return "O";
    } else if (props.randomPositions.some((pos) => pos.x === x && pos.y === y))
      return "X";
    else return " ";
  }

  console.log(props.maze);
  console.log(props.randomPositions);

  return (
    <table>
      <tbody>
        {" "}
        {props.maze.map((row, x) => (
          <tr key={x}>
            {row.map((cell, y) => (
              <td
                key={y}
                style={{
                  // border: "1px solid black",
                  borderLeft: cell.leftBorder
                    ? "2px solid black"
                    : "0px solid black",
                  borderRight: cell.rightBorder
                    ? "2px solid black"
                    : "0px solid black",
                  borderTop: cell.upBorder
                    ? "2px solid black"
                    : "0px solid black",
                  borderBottom: cell.downBorder
                    ? "2px solid black"
                    : "0px solid black",
                  textAlign: "center",
                  verticalAlign: "middle",
                  width: 55,
                  height: 55,
                }}
              >
                <p>{handleCellContent(x, y)}</p>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GameBoard;
