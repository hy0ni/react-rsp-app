import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../components/TokenContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  const allUsersGameList = (token) => {
    var requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      redirect: 'follow'
    };

    fetch("https://rps-games-dyowf.run.goorm.site/users", requestOptions)
      .then(response => response.json())
      .then(result => setUsers(result))
      .catch(error => console.log('error', error));
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