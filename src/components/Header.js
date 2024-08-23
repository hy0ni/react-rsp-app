import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "./TokenContext";
import '../css/Header.css'

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
            }} aria-label="마이페이지로 이동">마이페이지</button>
            <button onClick={handleLogoutClick}
              aria-label="로그아웃">로그아웃</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} aria-label="로그인 페이지로 이동">로그인</button>
        )
      }
    </header>
  )
}
export default Header;