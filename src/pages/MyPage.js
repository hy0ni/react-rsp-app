import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../context/TokenContext";
import GameTable from "../components/GameTable";
import '../css/GameTable.css'

function MyPage() {
  const { token } = useContext(TokenContext);
  const [currentUser, setCurrentUser] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [allGameHistory, setAllGameHistory] = useState([]);
  const [GameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    if (token) {
      currentUserInfo(token);
      currentGameHistory(token);
    }
  }, [token]);

  // 나의 정보 불러오기
  const currentUserInfo = (token) => {
    var requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      redirect: 'follow'
    };

    fetch("https://rps-games-dyowf.run.goorm.site/current_users", requestOptions)
      .then(response => response.json())
      .then(result => setCurrentUser(result))
      .catch(error => console.log('error', error));
  }

  // 나의 전체 전적 가져오기
  const currentGameHistory = (token) => {
    var requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      redirect: 'follow'
    };

    fetch("https://rps-games-dyowf.run.goorm.site/current_users/games", requestOptions)
      .then(response => response.json())
      .then(result => setAllGameHistory(result))
      .catch(error => console.log('error', error));
  }

  // 가위바위보 게임하기
  const handleGames = (e) => {
    e.preventDefault();

    var formdata = new FormData();
    formdata.append("user_choice", selectedValue);

    var requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://rps-games-dyowf.run.goorm.site/games", requestOptions)
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
        console.log(data)
        alert(`당신의 선택은 ${data.user_choice}이고 컴퓨터의 선택은 ${data.computer_choice}입니다.결과는 ${data.result}입니다.`)
      })
      .catch(error => console.log('error', error));
  }

  const handleGamesDelete = (gameId) => {
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
        setAllGameHistory(history => history.filter(game => game.id !== gameId));
        setGameHistory(history => history.filter(game => game.id !== gameId));

      })
      .catch(error => {
        console.log('오류:', error);
        alert(error.message);
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
      <GameTable games={[...GameHistory, ...allGameHistory]} onDelete={handleGamesDelete} />
    </div>
  )
}
export default MyPage;