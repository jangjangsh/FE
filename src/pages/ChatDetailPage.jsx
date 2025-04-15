import { ChatProvider } from '../contexts/ChatContextsh';
import Header from '../components/Header';
import SideBar from '../components/SideBar/SideBar';
import ChatSection from '../components/ChatPage/ChatSection';
import ChatInputBox from '../components/ChatPage/ChatInputBox';

const ChatDetailPage = () => {
  return (
    <ChatProvider>
      <Header />
      {/* 헤더: 고정 높이 */}
      {/* 본문 영역: Header 제외하고 나머지 전체 사용 */}
      <div className="relative h-screen flex-1">
        {/* 채팅 메시지 영역 */}
        <div className="flex justify-center h-full overflow-y-auto py-[60px]">
          <div className="w-[760px] ">
            <ChatSection />
          </div>
        </div>
      </div>
      <SideBar />
    </ChatProvider>
  );
};
export default ChatDetailPage;
