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

    const { accessToken, refreshToken, kakao_account } = data;

    return {
      success: true,
      accessToken, // ✅ 따로 꺼내서 반환
      refreshToken,
      kakao_account,
    };
  } catch (error) {
    const message = error.response?.data?.message || '카카오 로그인 중 오류 발생';
    return { success: false, error: message };
  }
};
