import Header from '../components/Header';
import ChatInputBox from '../components/ChatPage/ChatInputBox';
import SideBar from '../components/SideBar/SideBar';
import Typewriter from 'typewriter-effect';
import { useState } from 'react';

const ChatMainPage = () => {
  const [isClick, setIsClick] = useState(true);

  const isTypeSelected = () => {
    setIsClick(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen items-center">
      <Header />
      <SideBar />
      {/* 시작 문구 */}

      <div className="flex flex-col justify-center items-center h-[90%] w-[740px] ">
        <div className="flex text-[32px] text-center ">
          <div className="text-[32px] mb-8 text-center">
            {/* 두 번째 줄: 스포이드로 추출하세요 */}
            <div className="mb-1">
              <span>제품 반응 분석,</span>
            </div>

            <div className="flex whitespace-nowrap text-[32px] leading-[32px]">
              <div className="flex w-max">
                <div className="flex overflow-hidden whitespace-nowrap text-glass border-r-main">
                  <div className="text-[32px] text-main font-bold text-glass min-w-[130px] max-w-[150px]">
                    <Typewriter
                      options={{
                        strings: ['스포이드', 'SSPOID'],
                        autoStart: true,
                        loop: true,
                        cursor: '|', // ✅ 커서 명시
                        cursorClassName: 'font-semibold text-[#4952FA] animate-blink ', // ✅ 커서에도 같은 스타일 적용
                        skipAddStyles: false, // ✅ 기본 애니메이션 유지
                      }}
                    />
                  </div>

                  {/* <span className="text-main font-extrabold text-glass">SSPOID</span> */}
                </div>
              </div>
              <div>
                <span className="pl-1.5">로 추출하세요.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 메인 페이지는 sessionId 없기 때문에 Null */}
        <ChatInputBox sessionId={null} isTypeSelected={isTypeSelected} isClick={isClick} />
      </div>
    </div>
  );
};
export default ChatMainPage;
