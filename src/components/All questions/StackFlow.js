import React from "react";
import Main from "./Main";
import SideBar from "../sidebar/SideBar";
import "./question.css";

const StackFlow = () => {
  return (
    <>
      <div className="stackflow">
        <SideBar />
        <Main />
      </div>
    </>
  );
};

export default StackFlow;