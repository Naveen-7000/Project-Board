import Layout from "./components/Layout";
import "./App.css";
import Board from "./components/Board";
import { useState } from "react";
import Editable from "./components/Editable";

function App() {
  const [boards, setBoards] = useState([
    {
      id: Date.now() + Math.random() * 2,
      title: "To Do",
      cards: [
        {
          id: Date.now() + Math.random(),
          title: "Card 1",
        },
        {
          id: Date.now() + Math.random(),
          title: "Card 2",
        },
      ],
    },
    {
      id: Date.now() + Math.random() * 2,
      title: "Compelted",
      cards: [
        {
          id: Date.now() + Math.random(),
          title: "Card 3",
        },
      ],
    },
  ]);
  const [target, setTarget] = useState({
    cardId: "",
    boardId: "",
  });

  function addCard(title, boardId) {
    const card = {
      id: Date.now() + Math.random(),
      title,
    };

    const index = boards.findIndex((item) => item?.id === boardId);
    if (index < 0) return;
    const tempBoard = [...boards];
    tempBoard[index].cards.push(card);
    setBoards(tempBoard);
  }

  function removeCard(boardId, cardId) {
    const boardIndex = boards.findIndex((item) => item?.id === boardId);
    if (boardIndex < 0) return;
    const cardIndex = boards[boardIndex].cards.findIndex(
      (item) => item?.id === cardId
    );
    if (cardIndex < 0) return;

    const tempBoard = [...boards];
    tempBoard[boardIndex].cards.splice(cardIndex, 1);
    setBoards(tempBoard);
  }
  function addBoard(name) {
    const tempBoards = [...boards];
    tempBoards.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoards);
  }
  function removeBoard(boardId) {
    const boardIndex = boards.findIndex((item) => item?.id === boardId);
    if (boardIndex < 0) return;
    const tempBoards = [...boards];
    tempBoards.splice(boardIndex, 1);
    setBoards(tempBoards);
  }

  function handleDragEnter(cardId, boardId) {
    setTarget({
      cardId,
      boardId
    })
  }
  function handleDragEnd(cardId, boardId) {
    let sourceBoardIndex,sourceCardIndex,targetBoardIndex,targetCardIndex;
    sourceBoardIndex = boards.findIndex(item => item.id === boardId);
    if(sourceBoardIndex < 0)return;

    sourceCardIndex = boards[sourceBoardIndex].cards.findIndex(item => item.id === cardId);
    if(sourceCardIndex < 0)return;

    targetBoardIndex = boards.findIndex(item => item.id === target.boardId);
    if(targetBoardIndex < 0)return;

    targetCardIndex = boards[targetBoardIndex].cards.findIndex(item => item.id === target.cardId);
    if(targetCardIndex < 0)return;

    const tempBoards = [...boards];
    const tempCard = tempBoards[sourceBoardIndex].cards[sourceCardIndex];

    tempBoards[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoards[targetBoardIndex].cards.splice(targetCardIndex, 0,tempCard);

    setBoards(tempBoards);
  }
  return (
    <Layout>
      <div className="board-outer">
        <div className="boards">
          {boards.map((item) => (
            <Board
              key={item.id}
              props={item}
              removeBoard={removeBoard}
              addCard={addCard}
              handleDragEnter={handleDragEnter}
              handleDragEnd = {handleDragEnd}
            />
          ))}
          <div>
            <Editable
              text="Board"
              placeholder="Enter Board Name"
              displayClass="app_boards_add-board"
              editClass="app_boards_add-board_edit"
              onSubmit={addBoard}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
