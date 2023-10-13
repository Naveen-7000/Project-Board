import { useState } from "react";
export function useBoardState (){
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
//  below are the fucntions for adding new cards, board and removing board     also handler to handle drag and drop events of cards
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
      boardId,
    });
  }
  function handleDragEnd(cardId, boardId) {
    let sourceBoardIndex, sourceCardIndex, targetBoardIndex, targetCardIndex;
    sourceBoardIndex = boards.findIndex((item) => item.id === boardId);
    if (sourceBoardIndex < 0) return;

    sourceCardIndex = boards[sourceBoardIndex].cards.findIndex(
      (item) => item.id === cardId
    );
    if (sourceCardIndex < 0) return;

    targetBoardIndex = boards.findIndex((item) => item.id === target.boardId);
    if (targetBoardIndex < 0) return;

    targetCardIndex = boards[targetBoardIndex].cards.findIndex(
      (item) => item.id === target.cardId
    );
    if (targetCardIndex < 0) return;

    const tempBoards = [...boards];
    const tempCard = tempBoards[sourceBoardIndex].cards[sourceCardIndex];

    tempBoards[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoards[targetBoardIndex].cards.splice(targetCardIndex, 0, tempCard);

    setBoards(tempBoards);
  }
  return {
    boards,
    addCard,
    addBoard,
    removeBoard,
    handleDragEnter,
    handleDragEnd
  }
}