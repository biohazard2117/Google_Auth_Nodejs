import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/login/Login";

function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Index;