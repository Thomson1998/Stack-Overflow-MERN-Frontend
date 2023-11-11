import React from "react";
import SideBar from "../sidebar/SideBar";
import QuestionView from "./QuestionView";

const ViewQues = () => {
  return (
    <>
      <div className="stackflow">
        <SideBar />
        <QuestionView />
      </div>
    </>
  );
};

export default ViewQues;