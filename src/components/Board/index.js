import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Plus } from "react-feather";
import styles from "./index.module.css";
import Card from "../Card";
import Editable from "../Editable";
import {setRandomBackgroundColor } from "../../utility/colorGenerator";
const Board = ({props, removeBoard, addCard, handleDragEnter, handleDragEnd}) => {
  const titleRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);



  useEffect(()=>{
    if(titleRef && titleRef.current)
    setRandomBackgroundColor(titleRef);
  },[])
  return (
    <div className={styles.board}>
      <div className={styles.boardHeading}>
        <p className={styles.titleConatiner}>
          <span ref={titleRef} className={styles.title}>{props?.title}</span>
          <span className={styles.cardCount}>
            {props?.cards?.length}
          </span>
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
      {showDropdown && (
        <div className={styles.deletBoard}>
          <p>Are you sure</p>
          <button onClick={()=>removeBoard(props?.id)}>Delete</button>
        </div>
      )}
      {showAddCard && (
        <Editable
          text="New"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={addCard}
        />
      )}
      <div className={styles.cardsContainer}>
        {
          props?.cards.map((card,index)=>(
            <Card 
            key={card?.id} 
            props={card}
            boardId = {props?.id}
            handleDragEnd={handleDragEnd}
            handleDragEnter={handleDragEnter}
            />
          ))
        }
        <Editable
          text="New"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value)=>addCard(value,props?.id)}
        />
      </div>
    </div>
  );
};

export default Board;
