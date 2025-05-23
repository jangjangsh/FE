import Header from '../components/Header';
import { SSPOID } from '../utils/icons';

const IndexPage = () => {
  return (
    <>
      <Header />
      <section className="bg-bottomFade flex w-screen h-screen justify-center items-center gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col leading-[1.4] text-[48px] font-bold">
            <span>
              <span className="inline-block text-gd">실제 소비자</span>처럼,
            </span>
            <span className="">
              <span className="inline-block text-gd">페르소나</span>의 시선으로 말하는
            </span>
            <span className="">AI 서비스.</span>
          </div>
          {/* 소문구 */}
          <div>
            <span className="text-[18px] font-medium ">
              지금 로그인하고, 타깃 페르소나의 리뷰를 직접 경험해보세요.
            </span>
          </div>
          {/* 로그인, 회원가입 버튼 */}
          <div className="flex gap-4">
            <button className="font-medium mb-4 shadow-purpleGlow bg-gd text-white p-3 rounded-[30px] w-[130px] h-[48px]">
              로그인
            </button>
            <button className="font-medium mb-4 bg-white shadow-grayGlow text-black p-3 border border-gray-stroke10  rounded-[30px] w-[130px] h-[48px]">
              회원가입
            </button>
          </div>
        </div>
        {/* 대문구 */}

        <div>
          <img src={SSPOID} alt="" />
        </div>
      </section>
    </>
  );
};

export default IndexPage;
