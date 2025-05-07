import Header from '../components/Header';
import SideBar from '../components/SideBar/SideBar';
import ChatSection from '../components/ChatPage/ChatSection';
import ChatInputBox from '../components/ChatPage/ChatInputBox';
import { useParams } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import { getChatMessages } from '../utils/chat';

const ChatDetailPage = () => {
  const { sessionId } = useParams();

  const [allChatMessages, setAllChatMessages] = useState([]);

  // ✅ fetchMessagesAgain으로 넘겨줄 getBotChat은 useCallback으로 만들기
  const getBotChat = useCallback(async () => {
    try {
      const response = await getChatMessages(sessionId);
      console.log('서버 응답:', response);
      setAllChatMessages(response);
    } catch (error) {
      console.error('요청 실패', error);
    }
  }, [sessionId]); // ← 의존성에 sessionId만 넣기!

  // ✅ useEffect 안에서는 이 getBotChat() 호출만 하면 돼
  useEffect(() => {
    if (sessionId) {
      getBotChat();
    }
  }, [sessionId, getBotChat]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* 헤더: 고정 */}
      <Header />

      {/* 본문 전체: 헤더 제외 + InputBox 제외 */}
      <div className="pt-[60px] pb-[90px] pl-1 h-[calc(100vh-60px)] flex overflow-hidden">
        <SideBar />
        {/* 사이드바 */}

        {/* 채팅영역 */}
        <div className="flex-1 overflow-y-auto scrollbar-custom flex justify-center">
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
      <div className="fixed bottom-3 w-full flex justify-center bg-white z-20">
        <div className="w-[760px]">
          <ChatInputBox sessionId={sessionId} fetchMessagesAgain={getBotChat} />
        </div>
      </div>
    </div>
  );
};

export default ChatDetailPage;
