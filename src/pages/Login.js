import { TokenContext } from "../context/TokenContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from '../api';
import '../css/Form.css';

function Login() {
  const { login } = useContext(TokenContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);
      const token = response.data.token;
      if (token) {
        login(token);
        alert('로그인에 성공하였습니다.');
        navigate('/');
      } else {
        alert('로그인 처리중 문제가 발생하였습니다.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인에 실패하였습니다.');
    }
  }

  return (
    <div>
      <h1>로그인 페이지</h1>
      <form className="form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        <div>
          <label htmlFor="password">패스워드</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        <button className="btn" type="submit">로그인하기</button>
        <hr />
        <button className="btn bg-white" onClick={() => navigate('/signup')} type="submit" aria-label="회원가입페이지로 이동">가입하러 가기</button>
      </form>
    </div>
  )
}
export default Login;