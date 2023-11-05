import React, { useEffect, useState } from "react";
import Character from "./Character";
import charactersService from "../services/characters.service";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Col, Form, Row } from "react-bootstrap";

function Home() {
  const [characters, setCharacters] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    charactersService.getUserCharacters().then((response) => {
      setCharacters(response.data);
    });
  }, []);

  return (
    <>
      <Form>
        <Button onClick={() => navigate("/create")}>Crear</Button>
        <Row>
          {characters.map((c) => {
            return (
              <Col>
                <Character {...c} />
              </Col>
            );
          })}
        </Row>
      </Form>
    </>
  );
}

export default Home;
