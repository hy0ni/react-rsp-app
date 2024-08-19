import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { TokenProvider } from './components/TokenContext';
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";

function App() {
  return (
    <TokenProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user/:userId/games" element={<Users />} />
        </Routes>
      </Router>
    </TokenProvider>
  )
}

export default App;
