import Header from '../components/Header';
import ChatInputBox from '../components/ChatPage/ChatInputBox';
import SideBar from '../components/SideBar/SideBar';

const ChatMainPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center">
      <Header />
      <SideBar />
      {/* 시작 문구 */}
      <div className="flex flex-col justify-center items-center h-full w-[760px]">
        <div className="text-[32px] mb-6 font-bold tracking-wide leading-snug text-center w-full">
          제품 반응 분석, <br />
          <span className="text-main">스포이드</span>로 추출하세요.
        </div>

        {/* 메인 페이지는 sessionId 없기 때문에 Null */}
        <ChatInputBox sessionId={null} />
      </div>
    </div>
  );
};
export default ChatMainPage;
