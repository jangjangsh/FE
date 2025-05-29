// KakaoCallback.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const KakaoCallback = () => {
  const { kakaoLogin } = useAuth();
  const nav = useNavigate();
  const [isRequesting, setIsRequesting] = useState(false); // ✅ 중복 요청 방지 상태

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log('[useEffect] 카카오 코드:', code);
    console.log('[useEffect] isRequesting:', isRequesting);

    if (!code) {
      alert('로그인 코드가 없습니다.');

      return;
    }

    if (isRequesting) return; // ✅ 중복 방지
    setIsRequesting(true);

    kakaoLogin(code)
      .then((res) => {
        if (res?.success !== false) {
          nav('/chat'); // ✅ 로그인 성공 시
        } else {
          throw new Error('로그인 실패');
        }
      })
      .catch((err) => {
        console.error('카카오 로그인 실패:', err);
        alert('로그인에 실패했습니다.');
        nav('/login');
      })
      .finally(() => {
        setIsRequesting(false); // ✅ 항상 요청 해제
      });
  }, []);

  return <div className="text-center mt-[100px] text-[18px]"></div>;
};

export default KakaoCallback;
