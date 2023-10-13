import React from 'react'
import styles from "./index.module.css"
const Card = ({props, handleDragEnter, handleDragEnd, boardId}) => {
  return (
    <div 
    className={styles.cardContainer} 
    draggable
    onDragEnd={()=>handleDragEnd(props?.id, boardId)}
    onDragEnter={()=>handleDragEnter(props?.id, boardId)}
    >
      <div className={styles.cardTitle}>
      {props?.title}</div>
      </div>
  )
}

export default Card