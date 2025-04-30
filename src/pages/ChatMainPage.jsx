import Header from '../components/Header';
import ChatInputBox from '../components/ChatPage/ChatInputBox';
import SideBar from '../components/SideBar/SideBar';

const ChatMainPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center">
      <Header />
      <SideBar />
      {/* 시작 문구 */}

      <div className="flex flex-col justify-center items-center h-full w-[740px] ">
        <div className="flex text-[32px] text-center ">
          <div className="text-[32px] mb-8 text-center">
            {/* 두 번째 줄: 스포이드로 추출하세요 */}
            <div className="mb-1">
              <span>제품 반응 분석,</span>
            </div>

            <div className="flex whitespace-nowrap text-[32px] leading-[32px]">
              <div className="flex w-max">
                <div className="flex pr-1 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-main">
                  <span className="text-main font-extrabold text-glass">스포이드</span>
                </div>
              </div>
              <div>
                <span className="pl-1.5">로 추출하세요.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 메인 페이지는 sessionId 없기 때문에 Null */}
        <ChatInputBox sessionId={null} />
      </div>
    </div>
  );
};
export default ChatMainPage;
