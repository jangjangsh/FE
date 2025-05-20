// src/contexts/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import { login as loginAPI } from '../utils/login'; // ✅ utils 함수 사용
import { kakaoLogin as kakaoLoginAPI } from '../utils/login';
import { signup as signupAPI } from '../utils/signUp';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // 로그인 함수
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { accessToken, refreshToken } = await loginAPI(email, password);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setIsLoggedIn(true);
      setUser({ email });
      setErrorMsg('');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('이메일 또는 비밀번호가 틀렸습니다.');
      } else if (error.response.status === 404) {
        alert('존재하지 않는 사용자입니다.');
      } else {
        alert('로그인 중 알 수 없는 오류가 발생했습니다.');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 카카오 간편로그인 함수
  const kakaoLogin = async (code) => {
    setLoading(true);
    try {
      const result = await kakaoLoginAPI(code);

      if (result.success) {
        const { kakao_account } = result.data;

        const nickname = kakao_account?.profile?.nickname || '';
        const email = kakao_account?.email || '';

        setUser({ email, nickname });
        setIsLoggedIn(true);
      } else {
        setErrorMsg(result.error);
      }

      return result; // ✅ 이 줄 추가
    } catch (err) {
      console.error('카카오 로그인 실패', err);
      setErrorMsg('카카오 로그인 중 오류 발생');
      return { success: false, error: '카카오 로그인 중 오류 발생' }; // ✅ 실패 응답도 리턴
    } finally {
      setLoading(false);
    }
  };

  // 회원가입 함수
  const signup = async (nickname, email, password) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const result = await signupAPI(nickname, email, password);

      if (result.success) {
        const { accessToken, refreshToken } = result.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return { success: true };
      } else {
        setErrorMsg(result.error);
        return { success: false, error: result.error };
      }
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, errorMsg, loading, login, kakaoLogin, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
