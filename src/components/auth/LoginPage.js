import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../App";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "./auth.css";
import { Checkbox } from "@mui/material";

const LoginSchemaValidation = yup.object({
  email: yup.string().email().required("Please Enter A Valid Email"),
  password: yup.string().required("Minimum 8 Characters Required").min(8),
});

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchemaValidation,
      onSubmit: (val) => {
        handleClick(val);
      },
    });

  let handleClick = async (val) => {
    let { email, password } = val;
    let payload = { email, password };
    try {
      const res = await axios.post(`${url}/users/login`, payload);
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
      navigate("/login");
    }
  };

  //Session Storage Clean Sequrity purpose
  useEffect(() => {
    localStorage.clear("token");
  }, []);

  return (
    <div className="login-container">
      <h5>Login Here!</h5>
      <Form className="container-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder="Enter email"
            onBlur={handleBlur}
            value={values.email}
            name="email"
            onChange={handleChange}
          />
        </Form.Group>
        {touched.email && errors.email ? (
          <p style={{ color: "red" }}>{errors.email}</p>
        ) : (
          ""
        )}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            placeholder="Password"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            type={show ? "text" : "password"}
          />
        </Form.Group>
        {touched.password && errors.password ? (
          <p style={{ color: "red" }}>{errors.password}</p>
        ) : (
          ""
        )}
        <div className="checkbox-div">
          <Checkbox onClick={() => setShow(!show)} />
          <p>Show Password</p>
        </div>
        <Link to={"/forgotpassword"}>Forgot Password</Link>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div>
        <p>
          Don't have an account? <Link to={"/signup"}>SignUp</Link>
        </p>
      </div>

      <div>
        <h5>Sample Login</h5>
        <p>Email : admin@gmail.com</p>
        <p>Password : admin123</p>
      </div>
    </div>
  );
};

export default LoginPage;