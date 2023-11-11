import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AllQuestion from "./AllQuestion";

const Main = () => {
  const navigator = useNavigate();

  return (
    <>
      <div className="main">
        <div className="top">
          <h2>All Questions</h2>
          <Button onClick={() => navigator("/askquestion")}>
            Ask Question
          </Button>
        </div>
        <div className="filter-option">
          <p>Question stats</p>
        </div>
        <hr style={{ width: "100%" }} />
        <AllQuestion  />
      </div>
    </>
  );
};

export default Main;