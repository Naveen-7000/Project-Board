import Layout from "./components/Layout";
import Board from "./components/Board";
import Editable from "./components/Editable";
import { useBoardState } from "./hooks/useBoardState";
import "./App.css";

function App() {
 const {boards,removeBoard,addCard,addBoard,handleDragEnd,handleDragEnter} = useBoardState();
 
 return (
    <Layout>
      <div className="board-outer">
        <div className="boards">
          {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              removeBoard={removeBoard}
              addCard={addCard}
              handleDragEnter={handleDragEnter}
              handleDragEnd={handleDragEnd}
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
