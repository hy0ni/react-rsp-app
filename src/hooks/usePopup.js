import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function usePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [navigateTo, setNavigateTo] = useState(null);
  const navigate = useNavigate();

  const openPopup = (message, redirectPath = null) => {
    setPopupMessage(message);
    setShowPopup(true);
    setNavigateTo(redirectPath);
  };

  const closePopup = () => {
    setShowPopup(false);
    if (navigateTo) {
      navigate(navigateTo);
      setNavigateTo(null);
    }
  };

  return {
    showPopup,
    popupMessage,
    openPopup,
    closePopup,
  };
}

export default usePopup;