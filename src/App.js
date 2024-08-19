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

function App() {
  return (
    <TokenProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </TokenProvider>
  )
}

export default App;
