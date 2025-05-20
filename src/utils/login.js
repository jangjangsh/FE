import api from './api';

// 로그인
export const login = async (email, password) => {
  try {
    const { data } = await api.post('/api/login', { email, password });
    return data;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

// 간편로그인
// ✅ kakaoLogin 함수 수정
export const kakaoLogin = async (code) => {
  try {
    const { data } = await api.post('/api/login/kakao', { code });

    // 응답 성공 여부만 보고 로그인 성공 판단
    return { success: true, data };
  } catch (error) {
    const message = error.response?.data?.message || '카카오 로그인 중 오류 발생';
    return { success: false, error: message };
  }
};
