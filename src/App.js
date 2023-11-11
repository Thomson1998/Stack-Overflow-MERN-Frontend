import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import Signup from "./components/auth/Signup";
import AskQuestion from "./components/ask question/AskQuestion";
import AllQuestion from "./components/All questions/AllQuestion";
import StackFlow from "./components/All questions/StackFlow";
import NavBar from "./components/NavBar";
import ViewQues from "./components/viewQuestion/ViewQues";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Profile from "./components/auth/Profile";
export const url = "https://stack-overflow-mern-backend.onrender.com";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/askquestion" element={<AskQuestion />} />
        <Route path="/allques" element={<AllQuestion />} />
        <Route path="/" element={<StackFlow />} />
        <Route path="/viewques/:id" element={<ViewQues />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<StackFlow />} />
      </Routes>
    </div>
  );
}

export default App;
