// src/pages/KakaoCallback.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const KakaoCallback = () => {
  const { kakaoLogin } = useAuth();
  const nav = useNavigate();
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log('[🔥 useEffect 진입] code:', code);

    if (!code) {
      alert('로그인 코드가 없습니다.');
      return;
    }

    if (isRequesting) {
      console.log('[🚫 요청 차단됨] 이미 요청 중');
      return;
    }

    setIsRequesting(true);
    console.log('[✅ 요청 보냄]');

    kakaoLogin(code)
      .then((res) => {
        if (res?.success !== false) {
          nav('/chat');
        } else {
          throw new Error('로그인 실패');
        }
      })
      .catch((err) => {
        console.error('카카오 로그인 실패:', err?.response || err);
        alert('로그인에 실패했습니다.');
        nav('/login');
      })
      .finally(() => setIsRequesting(false));
  }, []);

  return <div className="text-center mt-[100px] text-[18px]">카카오 로그인 중...</div>;
};

export default KakaoCallback;
