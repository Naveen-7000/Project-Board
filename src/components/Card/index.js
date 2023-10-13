import React from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
const Card = ({ card, handleDragEnter, handleDragEnd, boardId,status }) => {
  const navigate = useNavigate();
  const cardDetail = {card,status,boardId}
  console.log(card,status,boardId);
  const handleClick = () => {
    if (card) {
      navigate(`/card/${card.id}`,{
        state :cardDetail
      });
    }
  };
  return (
    <div
      className={styles.cardContainer}
      draggable
      onDragEnd={() => handleDragEnd(card?.id, boardId)}
      onDragEnter={() => handleDragEnter(card?.id, boardId)}
      onClick={handleClick}
      >
      <div className={styles.cardTitle}>{card?.title}</div>
    </div>
  );
};

export default Card;
