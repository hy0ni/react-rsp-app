import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../context/TokenContext";
import { useNavigate } from "react-router-dom";
import '../css/Home.css'

function Home() {
  const [users, setUsers] = useState([]);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  const allUsersGameList = (token) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    let requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      redirect: 'follow'
    };

    fetch(`${apiUrl}/users`, requestOptions)
      .then(response => response.json())
      .then(result => setUsers(result))
      .catch(error => {
        console.log('error', error);
        alert('데이터를 가져오는 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
      });
  }

  useEffect(() => {
    allUsersGameList(token);
  }, [token]);

  const handleUserInfo = (userId) => {
    navigate(`/user/${userId}/games`);
  }
  return (
    <ul>
      {users.map((user) =>
        <li className="total-list" key={user.id}>
          <p>{user.email}</p>
          <span>{user.games_count}전</span>
          <button className="btn" onClick={() => handleUserInfo(user.id)}>이동</button>
        </li>)}
    </ul>
  )
}
export default Home;