const GameTable = ({ games, onDelete }) => {

  const formatDateTime = (utcString) => {
    const date = new Date(utcString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}/${month}/${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`
    return (
      <>
        <div className="text-gray">
          {formattedDate}
        </div>
        <div className="text-gray">
          {formattedTime}
        </div>
      </>
    );
  }

  const getBackgroundColor = (gameResult) => {
    switch (gameResult) {
      case '패배':
        return '#ffe8e6';
      case '승리':
        return '#e2ffe3';
      case '무승부':
        return '#fffad2';
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
                <td className="game-choice">
                  <div>
                    <span className="text-gray">사용자</span>
                    <span>{game.user_choice}</span>
                  </div>
                  <span className="text-gray text-bold">VS</span>
                  <div>
                    <span className="text-gray">컴퓨터</span>
                    <span>{game.computer_choice}</span>
                  </div>
                </td>
                <td>{formatDateTime(game.created_at)}</td>
                <td>
                  <button className="btn-delete" onClick={() => onDelete(game.id)}>삭제</button>
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