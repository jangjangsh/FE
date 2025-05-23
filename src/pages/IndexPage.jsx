import Header from '../components/Header';
import { SSPOID } from '../utils/icons';

const IndexPage = () => {
  return (
    <>
      <Header />
      <section className="flex w-screen h-screen justify-center items-center gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col leading-[1.4] text-[48px] font-semibold">
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
            <h3 className="text-[18px] font-medium opacity-80 mb-8">
              지금 로그인하고, 타깃 페르소나의 리뷰를 직접 경험해보세요.
            </h3>

            {/* 로그인, 회원가입 버튼 */}
            <button className="text-2xl font-bold mb-4 bg-main/100 text-white p-3 rounded">
              로그인 버튼
            </button>
            <button className="text-2xl font-bold mb-4 bg-main/100 text-white p-3 rounded">
              회원가입 버튼
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
