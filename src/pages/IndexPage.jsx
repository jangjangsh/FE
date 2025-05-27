import Header from '../components/Header';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IconExImg1 } from '../utils/icons';
import { IconExImg2 } from '../utils/icons';

const IndexPage = () => {
  const { user } = useAuth(); // ✅ 로그인 상태 확인
  const nav = useNavigate();

  const clickLoginButton = () => {
    nav(`/login`);
  };
  const clickSignUpButton = () => {
    nav(`/signup`);
  };

  useEffect(() => {
    if (user) {
      nav('/chat'); // ✅ 로그인 돼 있으면 자동 이동
    }
  }, [user, nav]);

  return (
    <>
      <Header />
      <section className="bg-bottomFade flex w-screen h-screen justify-center items-center gap-16">
        <div className="flex items-center justify-center">
          {/* 텍스트 */}
          <div className="animate-fadeSlideIn">
            <div className="flex flex-col text-[48px] font-bold leading-[1.4]">
              <div>
                <span className="mr-1 text-gd inline-block hover:-translate-y-1 transition-transform duration-300">
                  실제 소비자
                </span>
                처럼,
              </div>
              <div>
                <span className="mr-1 text-gd inline-block hover:-translate-y-1 transition-transform duration-300">
                  페르소나
                </span>
                의 시선으로 말하는
              </div>
              <div>AI 서비스.</div>

              <div className="text-[18px] font-medium my-8">
                지금 로그인하고, 타깃 페르소나의 리뷰를 직접 경험해보세요.
              </div>
              <div className="text-[16px] flex gap-4">
                <button
                  onClick={clickLoginButton}
                  className="font-medium mb-4 shadow-purpleGlow bg-gd text-white p-3 rounded-[30px] w-[130px] h-[48px]
                                hover:bg-gdLight"
                >
                  로그인
                </button>
                <button
                  onClick={clickSignUpButton}
                  className="font-medium mb-4 bg-white shadow-grayGlow text-black p-3 border border-gray-stroke10  rounded-[30px] w-[130px] h-[48px] hover:border-gray-stroke15 hover:shadow-grayGlowHover"
                >
                  회원가입
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 이미지 */}
        <div className="relative w-[550px] h-[400px]">
          <img
            src={IconExImg2}
            alt=""
            className="absolute top-0 left-[100px] w-[450px] rounded-md z-0 shadow-img hover:-translate-y-1 hover:shadow-imgHover transition-all duration-500 "
          />
          <img
            src={IconExImg1}
            alt=""
            className="absolute top-28 left-0 w-[450px] rounded-md z-10 shadow-img hover:-translate-y-1 hover:shadow-imgHover transition-all duration-500 "
          />
        </div>
      </section>
    </>
  );
};

export default IndexPage;
