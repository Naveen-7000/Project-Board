import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Plus } from "react-feather";
import styles from "./index.module.css";
import Card from "../Card";
import Editable from "../Editable";
import { setRandomBackgroundColor } from "../../lib/colorGenerator";
const Board = ({
  board,
  removeBoard,
  addCard,
  handleDragEnter,
  handleDragEnd,
}) => {
  const titleRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  useEffect(() => {
    if (titleRef && titleRef.current) setRandomBackgroundColor(titleRef);
  }, []);

  function addCardHandler (inputText){
    addCard(inputText);
    setShowAddCard(false);
  }
  return (
    <div className={styles.board}>
      <div className={styles.boardHeading}>
        <p className={styles.titleConatiner}>
          <span ref={titleRef} className={styles.title}>
            {board?.title}
          </span>
          <span className={styles.cardCount}>{board?.cards?.length}</span>
        </p>
        <div>
          <MoreHorizontal
            color="gray"
            size={"18px"}
            className={styles.iconHorizontal}
            onClick={() => setShowDropdown(!showDropdown)}
          />
          <Plus
            color="gray"
            size={"18px"}
            className={styles.iconPlus}
            onClick={() => setShowAddCard(!showAddCard)}
          />
        </div>
      </div>
      {/* dropdown to delete boards */}
      {showDropdown && (
        <div className={styles.deletBoard}>
          <p>Delete Board ?</p>
          <div>
            <button onClick={() => removeBoard(board?.id)}>Yes</button>
            <button onClick={() => setShowDropdown(false)}>No</button>
          </div>
        </div>
      )}
      {showAddCard && (
        <Editable
          text="New"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={addCardHandler}
        />
      )}
      <div className={styles.cardsContainer}>
        {board?.cards.map((card, index) => (
          <Card
            key={card?.id}
            card={card}
            status={board?.title}
            boardId={board?.id}
            handleDragEnd={handleDragEnd}
            handleDragEnter={handleDragEnter}
          />
        ))}
        <Editable
          text="New"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => addCard(value, board?.id)}
        />
      </div>
    </div>
  );
};

export default Board;
