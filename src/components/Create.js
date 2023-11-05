import React, { useEffect, useState } from "react";
import Character from "./Character";
import charactersService from "../services/characters.service";
import { Button, Col, Form, Row } from "react-bootstrap";

function Create() {
  const [characterizations, setCharacterizations] = useState({});
  const [character, setCharacter] = useState({
    _id: 0,
    face: { url: "face1.png" },
    top: { url: "top1.png" },
    bottom: { url: "bottom1.png" },
    shoes: { url: "shoes1.png" },
  });

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

  return (
    <Form>
      <Row>
        <Col>
          <Character {...character} />
        </Col>
        <Col xs={4}>
          <Button onClick={() => change("face")}>Next</Button>
          <Button onClick={() => change("top")}>Next t</Button>
          <Button onClick={() => change("bottom")}>Next b</Button>
          <Button onClick={() => change("shoes")}>Next Shoes</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Create;
