/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./ask.css";
import "react-quill/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { url } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  const quesSubmit = async () => {
    let payload = { title, body, tags };
    try {
      let res = await axios.post(`${url}/api/question`, payload);
      console.log(res)
      // toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.res.message);
    }
  };
  return (
    <>
      <div className="askques">
        <h2>Ask a Public question</h2>
        <div className="card">
          <div className="title">
            <h5>Title</h5>
            <p>
              Be specific and imagine youre asking a question to another person.
            </p>
            <input
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Is write your doubt?"
            />
          </div>
          <div className="body">
            <h5>What are the details of your problem?</h5>
            <p>
              Introduce the problem and expand on what you put in the title.
              Minimum 20 characters.
            </p>
            <textarea
              className="quill"
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="tags">
            <h5>Tags</h5>
            <TagsInput value={tags} onChange={setTags} />
          </div>
          <Button className="btn-ques" onClick={() => quesSubmit()}>
            Add Your Question
          </Button>
        </div>
      </div>
    </>
  );
};

export default AskQuestion;