import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 로그인 API
export const loginUser = async (email, password) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  return await api.post('/login', formData);
};

// 회원가입 API
export const signupUser = async (email, password) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  return await api.post('/signup', formData);
};

// 사용자 목록 가져오기
export const getAllUsers = async (token) => {
  return await api.get('/users', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// 나의 정보 불러오기
export const getCurrentUserInfo = (token) => {
  return api.get('/current_users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 나의 전체 전적 가져오기
export const getCurrentGameHistory = (token) => {
  return api.get('/current_users/games', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 가위바위보 게임하기
export const playGame = (token, userChoice) => {
  return api.post('/games', {
    user_choice: userChoice,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 게임 삭제하기
export const deleteGame = (token, gameId) => {
  return api.delete(`/games/${gameId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 특정 사용자 정보 가져오기
export const getUserInfo = async (userId, token) => {
  return await api.get(`/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// 특정 사용자 전적 가져오기
export const getUserGameHistory = async (userId) => {
  return await api.get(`/users/${userId}/games`);
}