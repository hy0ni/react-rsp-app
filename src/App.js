import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { TokenProvider } from './context/TokenContext';
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
import MyPage from "./pages/MyPage";
import './css/App.css';

function App() {
  return (
    <div className="container">
      <TokenProvider>
        <Router basename="/react-rsp-app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user/:userId/games" element={<Users />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Router>
      </TokenProvider>
    </div>
  )
}

export default App;
