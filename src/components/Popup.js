import '../css/Popup.css';

function Popup({ showPopup, message, onClose }) {
  return (
    showPopup && (
      <div className="Popup-overlay">
        <div className="Popup-content">
          <p>{message}</p>
          <button onClick={onClose} className="btn">확인</button>
        </div>
      </div>
    )
  );
}

export default Popup;