import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../context/TokenContext";
import usePopup from "../hooks/usePopup";
import Popup from "../components/Popup";
import '../css/Form.css';
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { isAuthenticated, login } = useContext(TokenContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showPopup, popupMessage, openPopup, closePopup } = usePopup();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate]);

  const handleSignUp = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    let requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://rps-games-dyowf.run.goorm.site/signup", requestOptions)
      .then(response => response.json())
      .then(data => {
        const token = data.token;
        if (token) {
          login(token);
          openPopup('회원가입에 성공하였습니다.', '/');
        } else {
          openPopup('회원가입에 실패하였습니다.')
        }
      })
      .catch(error => console.log('error', error));

  }
  return (
    <div>
      <h1>회원가입 페이지</h1>
      <form className="form" onSubmit={handleSignUp}>
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
        <button className="btn" type="submit">가입하기</button>
      </form>
      <Popup showPopup={showPopup} message={popupMessage} onClose={closePopup} />
    </div>
  )
}
export default SignUp;