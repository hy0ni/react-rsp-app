import { TokenContext } from "../context/TokenContext";
import { useContext, useEffect, useState } from "react";
import GameTable from "../components/GameTable";
import {
  getCurrentUserInfo,
  getCurrentGameHistory,
  playGame,
  deleteGame
} from '../api';
import '../css/GameTable.css'

function Mypage() {
  const { token } = useContext(TokenContext);
  const [currentUser, setCurrentUser] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [allGameHistory, setAllGameHistory] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    fetchCurrentUserInfo(token);
    fetchCurrentGameHistory(token);
  }, [token]);

  // 나의 정보 불러오기
  const fetchCurrentUserInfo = async (token) => {
    try {
      const response = await getCurrentUserInfo(token);
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Error fetching current user info:', error);
      alert('정보를 불러오는 중 오류가 발생했습니다.');
    }
  };

  // 나의 전체 전적 가져오기
  const fetchCurrentGameHistory = async (token) => {
    try {
      const response = await getCurrentGameHistory(token);
      if (Array.isArray(response.data)) {
        setAllGameHistory(response.data);
      } else {
        setAllGameHistory([]);
        console.error("배열이 아닙니다.", response.data);
      }
    } catch (error) {
      console.error('Error fetching game history:', error);
      alert('전체 전적 리스트를 가져오는 중 오류가 발생했습니다.');
    }
  };

  // 가위바위보 게임하기
  const handleGames = async (e) => {
    e.preventDefault();

    try {
      const response = await playGame(token, selectedValue);
      setGameHistory(history => [
        {
          id: response.data.id,
          computer_choice: response.data.computer_choice,
          created_at: response.data.created_at,
          result: response.data.result,
          user_choice: response.data.user_choice
        },
        ...history
      ]);
      alert(`당신의 선택은 ${response.data.user_choice}이고,
         컴퓨터의 선택은 ${response.data.computer_choice}입니다.
         결과는 ${response.data.result}입니다.`);
    } catch (error) {
      console.error('Error playing game:', error);
      alert('오류가 발생했습니다.');
    }
  }

  // 게임 삭제하기
  const handleGamesDelete = async (gameId) => {
    try {
      await deleteGame(token, gameId);
      alert('게임을 삭제하였습니다.');
      setAllGameHistory(history => history.filter(game => game.id !== gameId));
      setGameHistory(history => history.filter(game => game.id !== gameId));
    } catch (error) {
      console.error('Error deleting game:', error);
      alert('게임 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="my-page">
      <h1>마이페이지</h1>
      <h2>유저 정보</h2>
      <p>이메일: {currentUser.email}</p>
      <h3>컴퓨터와 결투하기</h3>
      <form onSubmit={handleGames}>
        <select value={selectedValue} onChange={e => setSelectedValue(e.target.value)}>
          <option value="" disabled>가위-바위-보 중 선택해주세요!</option>
          <option value="가위">가위</option>
          <option value="바위">바위</option>
          <option value="보">보</option>
        </select>
        <button className="btn" type="submit">결과 확인하기</button>
      </form>
      <h3>게임 정보</h3>
      <GameTable games={[...gameHistory, ...allGameHistory]} onDelete={handleGamesDelete} />
    </div>
  )
}
export default Mypage;