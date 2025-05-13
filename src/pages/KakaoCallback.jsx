// KakaoCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const KakaoCallback = () => {
  const { kakaoLogin } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (!code) {
      alert('로그인 코드가 없습니다.');
      return;
    }

    kakaoLogin(code)
      .then(() => {
        nav('/chat'); // 로그인 성공 후 이동할 페이지
      })
      .catch((err) => {
        console.error('카카오 로그인 실패:', err);
        alert('로그인에 실패했습니다.');
        nav('/login');
      });
  }, []);

  return <div className="text-center mt-[100px] text-[18px]">카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
