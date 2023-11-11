import "./question.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../../App";
import axios from "axios";

const AllQuestion = () => {
  const [data, setData] = useState([]);

  const getdata = async () => {
    let res = await axios.get(`${url}/api/question`);
     console.log(res);
    setData(res.data);
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      {data.map((e) => {
        return (
          <div className="question" key={e._id}>
            <div className="left">
              <div className="vote">
                <span>0</span>
                <p>Votes</p>
              </div>
              <div className="answer">
                <span>0</span>
                <p>Answer</p>
              </div>
              <div className="views">
                <span>0</span>
                <p>Views</p>
              </div>
            </div>
            <div className="right">
              <div className="right-body">
                <Link to={`/viewques/${e._id}`}>{e.title}</Link>
                <p>{e.body}</p>
                <div className="tags">
                  <Link>{e.tags}</Link>
                </div>
                <div className="author-details">
                  <p>{e.createdAt}</p>
                </div>
              </div>
              <hr />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AllQuestion;