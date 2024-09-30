import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../context/TokenContext";
import GameTable from "../components/GameTable";
import usePopup from "../hooks/usePopup";
import Popup from "../components/Popup";
import '../css/GameTable.css'

function MyPage() {
  const { token } = useContext(TokenContext);
  const [currentUser, setCurrentUser] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [allGameHistory, setAllGameHistory] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const { showPopup, popupMessage, openPopup, closePopup } = usePopup();

  useEffect(() => {
    currentUserInfo(token);
    currentGameHistory(token);
  }, [token]);


  // 나의 정보 불러오기
  const currentUserInfo = (token) => {
    let requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL}/current_users`, requestOptions)
      .then(response => response.json())
      .then(result => setCurrentUser(result))
      .catch(error => {
        console.log('error', error);
        alert('정보를 불러오는 중 오류가 발생했습니다.');
      });
  }

  // 나의 전체 전적 가져오기
  const currentGameHistory = (token) => {
    let requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL}/current_users/games`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (Array.isArray(result)) {
          setAllGameHistory(result);
        } else {
          setAllGameHistory([]);
          console.error("배열이 아닙니다.", result);
        }
      })
      .catch(error => {
        console.log('error', error);
        alert('전체 전적 리스트를 가져오는 중 오류가 발생했습니다.');
      });
  }

  // 가위바위보 게임하기
  const handleGames = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("user_choice", selectedValue);

    let requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL}/games`, requestOptions)
      .then(response => response.json())
      .then(data => {
        setGameHistory(history => [
          {
            id: data.id,
            computer_choice: data.computer_choice,
            created_at: data.created_at,
            result: data.result,
            user_choice: data.user_choice
          },
          ...history
        ])
        openPopup(`당신의 선택은 ${data.user_choice}이고,
           컴퓨터의 선택은 ${data.computer_choice}입니다.
           결과는 ${data.result}입니다.`);
      })
      .catch(error => {
        console.log('error', error);
        alert('오류가 발생했습니다.');
      });
  }

  const handleGamesDelete = (gameId) => {
    let requestOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL}/games/${gameId}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        openPopup('게임을 삭제하였습니다.');
        setAllGameHistory(history => history.filter(game => game.id !== gameId));
        setGameHistory(history => history.filter(game => game.id !== gameId));

      })
      .catch(error => {
        console.log('error', error);
        alert('게임 삭제 중 오류가 발생했습니다.');
      });
  }

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
      <Popup showPopup={showPopup} message={popupMessage} onClose={closePopup} />
    </div>
  )
}
export default MyPage;