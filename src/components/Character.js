import React from "react";
import styled from "styled-components";

const Img = styled.img`
  height: 200px;
  position: absolute;
`

function Character(c) {
  return (
    <div id={c._id} style={{  height:'200px'}} onClick={()=>console.log("click en el ñeri")}>
      <Img
        src={require(`../assets/img/face/${c.face.url}`)}
        alt="face"
      />
      <Img
        src={require(`../assets/img/top/${c.top.url}`)}
        alt="top"
      />
      <Img
        src={require(`../assets/img/bottom/${c.bottom.url}`)}
        alt="bottom"
      />
      <Img
        src={require(`../assets/img/shoes/${c.shoes.url}`)}
        alt="shoes"
      />
    </div>
  );
}

export default Character;
