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
export const kakaoLogin = async (code) => {
  try {
    const { data } = await api.post('/api/login/kakao', { code });

    // 토큰 없으면 실패로 간주
    if (data.accessToken && data.refreshToken) {
      return { success: true, data };
    } else {
      return { success: false, error: '토큰이 존재하지 않습니다.' };
    }
  } catch (error) {
    const message = error.response?.data?.message || '카카오 로그인 중 오류 발생';
    return { success: false, error: message };
  }
};
