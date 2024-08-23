// import { useContext } from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TokenContext } from "../context/TokenContext";
import GameTable from "../components/GameTable";
import '../css/GameTable.css'

function Users() {
  const { userId } = useParams(); // URL 파라미터에서 사용자 ID 가져오기
  const [user, setUser] = useState('');
  const [GameHistory, setGameHistory] = useState([]);
  const { isAuthenticated, token } = useContext(TokenContext);

  useEffect(() => {
    userInfo(userId, token)
    userGameHistoryList(userId);
  }, [userId, token]);

  // 특정 사용자 정보 가져오기
  const userInfo = (userId, token) => {
    var requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      redirect: 'follow'
    };

    fetch(`https://rps-games-dyowf.run.goorm.site/users/${userId}`, requestOptions)
      .then(response => response.json())
      .then(result => setUser(result))
      .catch(error => console.log('error', error));
  }

  // 특정 사용자의 전적 가져오기
  const userGameHistoryList = (userId) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://rps-games-dyowf.run.goorm.site/users/${userId}/games`, requestOptions)
      .then(response => response.json())
      .then(result => setGameHistory(result))
      .catch(error => console.log('error', error));
  }

  //전적 삭제하기
  const handleGamesDelete = (gameId) => {
    if (!isAuthenticated) {
      alert('로그인된 사용자만 삭제 가능')
      return;
    }

    var requestOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      redirect: 'follow'
    };

    fetch(`https://rps-games-dyowf.run.goorm.site/games/${gameId}`, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else if (response.status !== 404) {
          throw new Error('본인의 게임만 삭제 가능합니다.');
        }
      })
      .then(result => {
        console.log(result);
        alert('게임을 삭제하였습니다.');
        setGameHistory(GameHistory.filter(game => game.id !== gameId));

      })
      .catch(error => {
        console.log('오류:', error);
        alert(error.message);
      });
  }

  return (
    <div>
      <h1>프로필 페이지</h1>
      <h2>유저 정보</h2>
      <p>이메일: {user.email}</p>
      <h3>게임 정보</h3>
      <GameTable games={GameHistory} onDelete={handleGamesDelete} />
    </div>
  )
}
export default Users;