import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { TokenContext, TokenProvider } from './context/TokenContext';
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Users from "./pages/Users";
import Mypage from "./pages/Mypage";
import './css/App.css';
import { useContext } from "react";

function UnAuthRoute({ children }) {
  const { token } = useContext(TokenContext);
  if (!token) {
    return <Navigate to='/login' />;
  }
  return children;
}

function AuthRoute({ children }) {
  const { token } = useContext(TokenContext);
  if (token) {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  return (
    <div className="container">
      <TokenProvider>
        <Router basename="/product-app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
            <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
            <Route path="/user/:userId/games" element={<Users />} />
            <Route path="/mypage" element={<UnAuthRoute><Mypage /></UnAuthRoute>} />
          </Routes>
        </Router>
      </TokenProvider>
    </div>
  )
}

export default App;
