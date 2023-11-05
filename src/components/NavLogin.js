import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import styled from "styled-components";
import { login } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate  } from 'react-router-dom';

const StyledNavbar = styled(Navbar)`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const StyledSpan = styled.span`
  margin-right: 5px;
`;

function NavLogin() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState(null);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, pin))
      .then(() => {
        
          //alert("Bienvenido");
          navigate("/home");
        
      })
      .catch((err) => {
        alert(err)
      });
  };

  return (
    <StyledNavbar >
      {!isLoggedIn && <Form onSubmit={onSubmit}>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control
            type="password"
            placeholder="Pin"
            pattern="[0-9]*"
            maxLength={4}
            onChange={(e) => setPin(Number(e.target.value))}
          />
        <Button type="submit">Login</Button>
      </Form>}
    </StyledNavbar>
  );
}

export default NavLogin;
