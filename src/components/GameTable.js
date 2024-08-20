const GameTable = ({ games, onDelete }) => {

  const formatDateTime = (utcString) => {
    const date = new Date(utcString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }

  const getBackgroundColor = (gameResult) => {
    switch (gameResult) {
      case '패배':
        return '#ff9b9466';
      case '승리':
        return '#4cae4f66';
      case '무승부':
        return '#ffe50066';
      default:
        return '#fff';
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>결과</th>
          <th>플레이</th>
          <th>일정</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {
          games.length > 0 && (
            games.map((game) => (
              <tr key={game.id} style={{ backgroundColor: getBackgroundColor(game.result) }}>
                <td>{game.result}</td>
                <td>
                  <div>
                    <span>사용자</span>
                    <span>{game.user_choice}</span>
                  </div>
                  <span>VS</span>
                  <div>
                    <span>컴퓨터</span>
                    <span>{game.computer_choice}</span>
                  </div>
                </td>
                <td>{formatDateTime(game.created_at)}</td>
                <td>
                  <button onClick={() => onDelete(game.id)}>삭제</button>
                </td>
              </tr>
            ))
          )
        }
      </tbody>
    </table>
  )

}

export default GameTable;