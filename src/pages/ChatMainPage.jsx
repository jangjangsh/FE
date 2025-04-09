import Header from '../components/Header';
import Sidebar from '../components/SideBar/SideBar';
import ChatInputBox from '../components/ChatDetailPage/ChatInputBox';

const ChatMainPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center">
      <Header />
      <div className="flex flex-col justify-center items-center h-3/5 w-[760px]">
        <div className="text-[32px] mb-6 font-bold tracking-wide leading-snug text-center w-full">
          제품 반응 분석, <br />
          <span className="text-main">스포이드</span>로 추출하세요.
        </div>
        {/* 채팅 입력 컨테이너 */}
        <ChatInputBox />
      </div>
    </div>
  );
};
export default ChatMainPage;
