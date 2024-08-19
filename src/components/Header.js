import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "./TokenContext";

function Header() {
  const { isAuthenticated, logout } = useContext(TokenContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  }

  return (
    <header className="header">
      <Link to="/">가바보.io</Link>
      {
        isAuthenticated ? (
          <>
            <button onClick={() => {
              navigate('/mypage');
            }}>마이페이지</button>
            <button onClick={handleLogoutClick}>로그아웃</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')}>로그인</button>
        )
      }
    </header>
  )
}
export default Header;