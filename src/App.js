
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPost from "./pages/AddPost";
import Update from "./pages/Update";
import { useContext } from "react";
import AuthContext from "./store/auth-context";



function App() {
const authCtx = useContext(AuthContext)



  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={authCtx.isLoggedIn ? <Home /> : <Login /> } />
          <Route path="/add-post" element={authCtx.isLoggedIn ? <AddPost /> : <Login />} />
          <Route path="/update-post/:id" element={authCtx.isLoggedIn ? <Update /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
