import { TokenContext } from "../context/TokenContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from '../api';
import '../css/Home.css'

function Home() {
  const { token } = useContext(TokenContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers(token);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('데이터를 가져오는 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
      }
    };

    fetchUsers();
  }, [token, setUsers]);

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