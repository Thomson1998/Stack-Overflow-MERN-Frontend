/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./index.css";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { url } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";

const QuestionView = ({ view, setView }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [answer, setAnswer] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [answerData, setAnswerData] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    let res = await axios.get(`${url}/api/question/${id}`);
    setData(res.data);
    setCommentData(res.data[0].comments);
    setAnswerData(res.data[0].answerDetails);
    // console.log(res.data);
  };

  const commentSubmit = async () => {
    let payload = { comment, question_id: id };
    try {
      let res = await axios.post(`${url}/api/comment/${id}`, payload);
      toast.success(res.data.message);
      setShow(!show);
    } catch (error) {
      toast.error(error.res.message);
    }
  };

  const answerSubmit = async () => {
    let payload = { answer, question_id: id };
    try {
      let res = await axios.post(`${url}/api/answer`, payload);
      toast.success(res.data.message);
      setShow(!show);
    } catch (error) {
      toast.error(error.res.error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="main-ques">
        {data.map((e, i) => {
          return (
            <div className="view-ques" key={i}>
              <div className="ques-title">
                <h5>{e.title}</h5>
                <Button
                  onClick={() => {
                    navigate("/askquestion");
                  }}
                >
                  Ask Your Question
                </Button>
              </div>
              <div className="status">
                <p>Timestamp</p>
                <p>
                  Active <span>today</span>
                </p>
                <p>
                  Viewed<span>{view} times</span>
                </p>
              </div>
              <div className="body">
                <div className="left"></div>
                <div className="right">
                  <p>{e.body}</p>
                  <div className="answer">
                    <div className="answer-box">
                      <h6>View Answers</h6>
                      {answerData.map((e, i) => {
                        return (
                          <div key={i} className="display-answer">
                            <p>{e.answer}</p>
                          </div>
                        );
                      })}
                    </div>
                    <p>Write Your Answer</p>
                    <Link onClick={() => setShow(!show)}>Add to Answer </Link>
                    {show && (
                      <div className="hidden">
                        <textarea
                          type="text"
                          onChange={(e) => setAnswer(e.target.value)}
                          placeholder="Write Answers"
                        />
                        <Button onClick={() => answerSubmit()}>
                          Add Answer
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="comment">
                    <div className="comment-box">
                      <h6>View Your Comments</h6>
                      {commentData.map((e, i) => {
                        return (
                          <div key={i} className="display-comment">
                            <p>{e.comment}</p>
                          </div>
                        );
                      })}
                    </div>
                    <p>Write Your comment</p>
                    <Link onClick={() => setShow(!show)}>Add to Comment </Link>
                    {show && (
                      <div className="hidden">
                        <textarea
                          type="text"
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Write comment"
                        />
                        <Button onClick={() => commentSubmit()}>
                          Add comment
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default QuestionView;