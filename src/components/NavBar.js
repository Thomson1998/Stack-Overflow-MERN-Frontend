/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ".././components/index.css";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = () => {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const Logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Navbar fixed="top">
        <Container>
          <div className="header">
            <Link to={"/"}>StackOverFlow</Link>
          </div>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <SearchIcon style={{ color: "black", cursor: "pointer" }} />
          </Form>
          <Link to="/">Products</Link>
          <Link to="/">Company</Link>
          <div className="user-profile">
            <Link onClick={() => setShow(!show)}>User Profile</Link>
            {show && (
              <div className="user-drop">
                <Link>Profile</Link>
                {token ? (
                  <Link onClick={() => Logout()}>Logout</Link>
                ) : (
                  <Link to={"/login"}>Login</Link>
                )}
              </div>
            )}
          </div>

          <Button
            className="signup"
            onClick={() => navigate("/signup")}
            variant="light"
          >
            SignUp
          </Button>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;