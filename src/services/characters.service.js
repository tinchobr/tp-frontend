import axios from "axios";
import authHeader from "./auth-header";

const createCharacter = () => {
  return axios.post("/character", {}, { headers: authHeader() });
};

const getUserCharacters = () =>{
  return axios.get('/users/characters', {headers : authHeader()});
}

const getCharacterizations = () =>{
  return axios.get('/characterizations', {headers : authHeader()});
}

export default {
  createCharacter, getUserCharacters, getCharacterizations
};
