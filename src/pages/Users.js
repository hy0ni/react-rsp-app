import { TokenContext } from "../context/TokenContext";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getUserInfo, getUserGameHistory, deleteGame } from '../api';
import GameTable from "../components/GameTable";
import '../css/GameTable.css'

function Users() {
  const { userId } = useParams(); // URL 파라미터에서 사용자 ID 가져오기
  const { isAuthenticated, token } = useContext(TokenContext);
  const [user, setUser] = useState('');
  const [GameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    fetchUserData(userId, token)
    fetchGameHistory(userId);
  }, [userId, token]);

  // 특정 사용자 정보 가져오기
  const fetchUserData = async (userId, token) => {
    try {
      const userInfo = await getUserInfo(userId, token);
      setUser(userInfo.data); // userInfo.data를 사용하여 사용자 정보 설정
    } catch (error) {
      console.error('정보를 가져오는 중 오류가 발생했습니다.', error);
      alert('정보를 가져오는 중 오류가 발생했습니다.');
    }
  };

  // 특정 사용자의 전적 가져오기
  const fetchGameHistory = async (userId) => {
    try {
      const history = await getUserGameHistory(userId);
      setGameHistory(history.data); // history.data를 사용하여 게임 기록 설정
    } catch (error) {
      console.error('사용자의 전적을 가져오는 중 오류가 발생했습니다.', error);
      alert('사용자의 전적을 가져오는 중 오류가 발생했습니다.');
    }
  };

  //전적 삭제하기
  const handleGamesDelete = async (gameId) => {
    if (!isAuthenticated) {
      alert('로그인 후 삭제가 가능합니다.');
      return;
    }
    try {
      await deleteGame(token, gameId);
      alert('게임을 삭제하였습니다.');
      setGameHistory(prev => prev.filter(game => game.id !== gameId));
    } catch (error) {
      console.error('오류:', error);
      alert('본인의 게임만 삭제 가능합니다.', error.message);
    }
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