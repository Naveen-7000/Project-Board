import React from "react";
import styles from "./index.module.css";
const Card = ({ card, handleDragEnter, handleDragEnd, boardId }) => {
  return (
    <div
      className={styles.cardContainer}
      draggable
      onDragEnd={() => handleDragEnd(card?.id, boardId)}
      onDragEnter={() => handleDragEnter(card?.id, boardId)}
    >
      <div className={styles.cardTitle}>{card?.title}</div>
    </div>
  );
};

export default Card;
