import { useState,useEffect } from "react";
export function useBoardState (){
const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("boards")) || []);
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

  function removeCard(boardId, cardId) {
    const index = boards.findIndex((item) => item.id === boardId);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  }

  const updateCard = (boardId, cardId, card) => {
    const index = boards.findIndex((item) => item.id === boardId);
    if (index < 0) return;
    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;
    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;
    tempBoards[index].cards[cardIndex] = card;
    setBoards(tempBoards);
  };

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

  function updateBoard(targetBoardId, cardId,currentBoardId,card) {
    const boardIndex = boards.findIndex((item) => item?.title === targetBoardId);
    if (boardIndex < 0) {
      // remove card from previous board || status

      const tempBoards = [...boards];
      tempBoards.push({
        id: Date.now() + Math.random() * 2,
        title: targetBoardId,
        cards: [card],
      });

      setBoards(tempBoards);
      removeCard(currentBoardId, cardId);
    }else{

      const tempBoards = [...boards];
      tempBoards[boardIndex].cards.push(card);
      setBoards(tempBoards);
      removeCard(currentBoardId, cardId);
    }
  }

  useEffect(()=>{
    localStorage.setItem("boards",JSON.stringify(boards));
   },[boards]) 

  return {
    boards,
    addCard,
    removeCard,
    updateCard,
    addBoard,
    removeBoard,
    updateBoard,
    handleDragEnter,
    handleDragEnd
  }
}