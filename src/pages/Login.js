import { useContext, useState } from "react";
import { TokenContext } from "../components/TokenContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(TokenContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://rps-games-dyowf.run.goorm.site/login", requestOptions)
      .then(response => response.json())
      .then(data => {
        const token = data.token;
        if (token) {
          login(token);
          window.alert('로그인에 성공하였습니다.');
          navigate('/');
        } else {
          window.alert('로그인에 실패하였습니다.')
        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div>
      <h1>로그인 페이지</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">로그인하기</button>
        <button onClick={() => navigate('/signup')} >가입하러 가기</button>
      </form>
    </div>
  )
}
export default Login;