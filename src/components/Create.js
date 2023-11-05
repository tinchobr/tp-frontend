import React, { useEffect, useState } from "react";
import Character from "./Character";
import charactersService from "../services/characters.service";
import { Button, Col, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledButton = styled(Button)`
  width: fit-content;
  margin-top: auto;
  margin-left: 10px;
`;

function Create() {
  let navigate = useNavigate();
  const [characterizations, setCharacterizations] = useState({});
  const [character, setCharacter] = useState({
    _id: 0,
    face: { url: "face1.png" },
    top: { url: "top1.png" },
    bottom: { url: "bottom1.png" },
    shoes: { url: "shoes1.png" },
  });

  useEffect(() => {
    charactersService.getCharacterizations().then((response) => {
      let grouped = groupBy(response.data, "type");
      setCharacterizations(grouped);
      setCharacter({
        ...character,
        face: grouped.face[0],
        top: grouped.top[0],
        bottom: grouped.bottom[0],
        shoes: grouped.shoes[0],
      });
    });
  }, []);

  function groupBy(arr, property) {
    return arr.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }

  const change = (type) => {
    var currentIndex = characterizations[type].indexOf(character[type]);
    var nextIndex = currentIndex + 1;
    var newValue =
      characterizations[type][
        nextIndex < characterizations[type].length ? nextIndex : 0
      ];
    console.log(currentIndex, nextIndex, newValue);
    setCharacter({ ...character, [type]: newValue });
  };

  const save = () => {
    var body = {
      name: character.name,
      face: character.face._id,
      top: character.top._id,
      bottom: character.bottom._id,
      shoes: character.shoes._id,
    };

    charactersService
      .createCharacter(body)
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        alert("Error creating character");
      });
  };

  return (
    <Form>
      <Row>
        <Col>
          <Character {...character} />
        </Col>
        <Col style={{ display: "inline-grid" }}>
          <Form.Control
            style={{
              width: "fit-content",
              marginTop: "auto",
              marginLeft: "10px",
            }}
            placeholder="Name"
            onChange={(e) =>
              setCharacter({ ...character, name: e.target.value })
            }
          />
          <StyledButton onClick={() => change("face")}>Next face</StyledButton>
          <StyledButton onClick={() => change("top")}>Next top</StyledButton>
          <StyledButton onClick={() => change("bottom")}>
            Next bottom
          </StyledButton>
          <StyledButton onClick={() => change("shoes")}>
            Next Shoes
          </StyledButton>
        </Col>
      </Row>
      <Col style={{ marginTop: "10px" }}>
        <StyledButton variant="success" onClick={() => save()}>
          Save
        </StyledButton>
        <StyledButton variant="secondary" onClick={() => navigate("/home")}>
          Cancel
        </StyledButton>
      </Col>
    </Form>
  );
}

export default Create;
