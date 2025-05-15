import { KakaoLoginL } from '../../utils/icons';

const SocialLogin = () => {
  // .env에서 restapi 불러와 카카오 로그인 url 생성
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = 'https://localhost:5173/login/kakao'; // 카카오에 등록된 redirect_uri
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL; // 👉 카카오 로그인 창 이동
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative flex items-center mt-[36px] mb-[24px]">
        <div className="flex-grow border-t border-gray-stroke10 h-px w-[72px]"></div>
        <span className="flex-shrink mx-[16px] text-gray-stroke50 font-medium text-[14px] leading-[1.4] tracking-[-0.025em] ">
          소셜 계정으로 간편 로그인
        </span>
        <div className="flex-grow border-t border-gray-stroke10 h-px w-[72px]"></div>
      </div>

      <div onClick={handleKakaoLogin}>
        <img
          className="w-full cursor-pointer border border-kakao rounded-[8px]"
          src={KakaoLoginL}
          alt="kakaologin"
        />
      </div>
    </div>
  );
};

export default SocialLogin;
