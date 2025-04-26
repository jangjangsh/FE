import Header from '../components/Header';
import SideBar from '../components/SideBar/SideBar';
import ChatSection from '../components/ChatPage/ChatSection';
import ChatInputBox from '../components/ChatPage/ChatInputBox';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getChatMessages } from '../utils/chat';

const ChatDetailPage = () => {
  const { sessionId } = useParams();

  const [allChatMessages, setAllChatMessages] = useState([]);

  const getBotChat = async () => {
    try {
      const response = await getChatMessages(sessionId);
      console.log('서버 응답:', response);
      setAllChatMessages(response);
    } catch (error) {
      console.error('요청 실패', error);
    }
  };

  useEffect(() => {
    if (sessionId) {
      getBotChat(); // ✅ 여기서 함수 호출해줘야 함!!
    }
  }, [sessionId]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* 헤더: 고정 */}
      <Header />

      {/* 본문 전체: 헤더 제외 + InputBox 제외 */}
      <div className="pt-[60px] pb-[100px] h-[calc(100vh-60px)] flex overflow-hidden">
        {/* 사이드바 */}
        <SideBar />

        {/* 채팅영역 */}
        <div className="flex-1 overflow-y-auto flex justify-center pl-[16px]">
          <div className="w-[760px]">
            <ChatSection
              sessionId={sessionId}
              allChatMessages={allChatMessages}
              getBotChat={getBotChat}
            />
          </div>
        </div>
      </div>

      {/* 고정된 InputBox */}
      <div className="fixed bottom-3 w-full flex justify-center bg-white z-50">
        <div className="w-[760px]">
          <ChatInputBox sessionId={sessionId} fetchMessagesAgain={getBotChat} />
        </div>
      </div>
    </div>
  );
};

export default ChatDetailPage;
