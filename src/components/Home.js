import React, { useEffect, useState } from "react";
import axios from "axios";
import Character from "./Character";
import { Carousel, Col, Row, Button, Form } from "react-bootstrap";
import useWindowDimensions from "../hooks/useWindowDimensions";
import charactersService from "../services/characters.service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [characters, setCharacters] = useState([]);
  const { width } = useWindowDimensions();
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn){
      charactersService.getUserCharacters().then((response) => {
        setCharacters(response.data);
      });
    }else{
      axios.get("/characters").then((response) => {
        setCharacters(response.data);
      });
    }
  }, [isLoggedIn]);

  const setCarouselItem = () => {
    var full = width > 1000;

    var items = [];

    if (full) {

      for (let index = 0; index < characters.length; index+=3) {
        var sliced = characters.slice(index, index+3)

        var cols = sliced.map(character=>{
          return (<Col><Character {...character} /></Col>)
        })

        items.push(<Carousel.Item>
          <Row>
            <Row>
              {cols}
            </Row>
          </Row>
        </Carousel.Item>)
        
      }
    } else {
      items = characters.map((character) => {
        return (
          <Carousel.Item>
            <Row>
          <Col>
            <Character {...character} />
          </Col></Row>
          </Carousel.Item>
        );
      });
    }

    return items;
  };

  return (
    <Form style={{marginTop:'10px'}}>
    { isLoggedIn && <Button onClick={() => navigate("/create")}>New</Button>}
    <Carousel controls={false} variant="dark">
      {setCarouselItem()}
    </Carousel>
    </Form>
  );
}

export default Home;
