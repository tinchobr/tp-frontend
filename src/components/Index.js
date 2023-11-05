import React, { useEffect, useState } from "react";
import axios from "axios";
import Character from "./Character";
import { Col, Form, Row } from "react-bootstrap";

function Index() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get("/characters").then((response) => {
      setCharacters(response.data);
    });
  }, []);

  return (
    <Form >
      <Row >
        {characters.map((c) => {
          return (
            <Col>
              <Character {...c} />
                <h3>{c.name}</h3>
            </Col>
          );
        })}
      </Row>
    </Form>
  );
}

export default Index;
