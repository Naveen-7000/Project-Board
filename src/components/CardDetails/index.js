import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { Type, List, Tag, ArrowLeft } from "react-feather";
import Editable from "../Editable";
import { useBoardState } from "../../hooks/useBoardState";
import "./index.css";
const CardDetails = () => {
  const location = useLocation();
  const cardData = location?.state;
  const { updateCard, updateBoard, removeCard } = useBoardState();
  const [values, setValues] = useState({
    ...cardData?.card,
    status: cardData.status,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (updateCard) updateCard(cardData?.boardId, values?.id, values);
    if (updateBoard)
      updateBoard(values?.status, values?.id, cardData?.boardId, values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const updateDesc = (value) => {
    setValues({ ...values, description: value });
  };

  const updateStatus = (value) => {
    setValues({ ...values, status: value });
  };

  const removeCardHandler = (e, boardId, cardId) => {
    e.preventDefault();
    removeCard(boardId, cardId);
    alert("Card removed successfully");
  };
  return (
    <Layout>
      <div className="card-info-container">
        <div className="navigation">
          <ArrowLeft
            size={"16px"}
            className="icon"
            onClick={() => navigate("/")}
          />
          <h4>Card Details</h4>
        </div>
        <div className="card-info">
          <form>
            <div className="fields">
              <p>
                <Type size={"16px"} className="icon" />
                Title
              </p>
              <Editable
                defaultValue={values?.title}
                text={values?.title}
                placeholder="Enter Title"
                onSubmit={updateTitle}
              />
            </div>
            <div className="fields">
              <p>
                <List size={"16px"} className="icon" />
                Description
              </p>
              <Editable
                defaultValue={values?.description || "empty"}
                text={values?.description || "empty"}
                placeholder="Enter Description"
                onSubmit={updateDesc}
              />
            </div>
            <div className="fields">
              <p>
                <Tag size={"16px"} className="icon" />
                Status
              </p>
              <Editable
                defaultValue={values?.status}
                text={values?.status}
                placeholder="Enter Status"
                onSubmit={updateStatus}
              />
            </div>
          </form>
          <div className="removeCard">
            <button
              onClick={(e) =>
                removeCardHandler(e, cardData?.boardId, values?.id)
              }
            >
              Delete Card
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CardDetails;
