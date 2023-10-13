import React,{useState,useEffect} from 'react'
import Layout from "../Layout";
import { useLocation } from 'react-router-dom';
import { Type,List, Tag } from 'react-feather';
import Editable from '../Editable';
import { useBoardState } from '../../hooks/useBoardState';
import "./index.css"
const CardDetails = () => {
  const location = useLocation();
  const cardData = location?.state;
  const {updateCard,updateBoard,removeCard} = useBoardState();
  const [values, setValues] = useState({
    ...cardData?.card,
  });
  
  const [status, setStatus] = useState(cardData?.status)

  useEffect(() => {
    if (updateCard) updateCard(cardData?.boardId, values.id, values);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

    console.log(cardData,"details");
  useEffect(() => {
    if (updateBoard) updateBoard(status, values.id,cardData?.boardId,values);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const updateDesc = (value) => {
    setValues({ ...values, description: value });
  };

  const updateStatus = (value) => {
    setStatus(value);
  }

  const removeCardHandler = (boardId, cardId) => {
    removeCard(boardId,cardId);
    alert('Card removed successfully');
  }
  return (
  <Layout>
   <div className='card-info-container'>
    <h4>Card Details</h4>
    <div className='card-info'>
      <form>
        <div className='fields'>
        <p><Type size={"16px"} className='icon'/>Title</p>
        <Editable
            defaultValue={values?.title}
            text={values?.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>
        <div className='fields'>
        <p><List size={"16px"} className='icon' />Description</p>
        <Editable
            defaultValue={values?.description || "empty"}
            text={values?.description || "empty"}
            placeholder="Enter Description"
            onSubmit={updateDesc}
          />
        </div>
        <div className='fields'>
        <p><Tag size={"16px"} className='icon'/>Status</p>
        <Editable
            defaultValue={status}
            text={status}
            placeholder="Enter Status"
            onSubmit={updateStatus}
          />
        </div>
      </form>
      <div>
        <button onClick={()=>removeCardHandler(cardData?.boardId,values?.id)} >Delete Card</button>
      </div>
    </div>
   </div>
    </Layout>
  )
}

export default CardDetails