import Header from "./components/Header";
import NavLogin from "./components/NavLogin";
import './App.css'
import { Button } from "react-bootstrap";
import { logout } from "./actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate  } from 'react-router-dom';


function App({children}) {
  
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth);
  return (
    <div className="App">
      <Header>TP-FRONTEND</Header>
      <NavLogin />
      {isLoggedIn && <Button
        onClick={()=>{
          navigate("/");
          dispatch(logout())
        }}
        children="Logout"
      />}
      {children}
    </div>
  );
}

export default App;
