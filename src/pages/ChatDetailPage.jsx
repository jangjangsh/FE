import Header from '../components/Header';
import SideBar from '../components/SideBar/SideBar';
import ChatSection from '../components/ChatPage/ChatSection';
import ChatInputBox from '../components/ChatPage/ChatInputBox';
import SessionSummary from '../components/Header/SessionSummary';
import { useParams } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import { getChatMessages } from '../utils/chat';
import { useChat } from '../contexts/ChatContext';

const ChatDetailPage = () => {
  const { sessionId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { sessionMessages, setSessionMessages, pendingUserMessage, setPendingUserMessage } =
    useChat();

  // ✅ fetchMessagesAgain으로 넘겨줄 getBotChat은 useCallback으로 만들기
  const getBotChat = useCallback(async () => {
    try {
      const response = await getChatMessages(sessionId);
      console.log('서버 응답:', response);

      // 빈 배열이면 유지, 있으면 갱신
      if (Array.isArray(response) && response.length > 0) {
        setSessionMessages(response);
      }
    } catch (error) {
      console.error('요청 실패', error);
    }
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) return;

    // ✅ 1단계: 전역에 저장된 유저 메시지가 있으면 먼저 화면에 표시
    if (pendingUserMessage) {
      setSessionMessages([pendingUserMessage]);
      setPendingUserMessage(null); // 한번 보여주고 초기화
    }

    // ✅ 2단계: 서버에서 메시지 다시 받아오기
    getBotChat();
  }, [sessionId, getBotChat]);

  // useEffect(() => {
  //   if (!currentSessionId) return;

  //   setSessionMessages([]); // ✅ 새 세션일 땐 초기화 먼저!
  //   getBotChat(currentSessionId); // 백엔드에서 메시지 가져오기
  // }, [currentSessionId]);

  const onClick = () => {
    setIsOpen(!isOpen); // 토글 열리고 닫힘
    console.log(isOpen);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* 헤더: 고정 */}
      <div>
        <Header onClick={onClick} />
        <div>{isOpen ? <SessionSummary sessionId={sessionId} onClick={onClick} /> : null}</div>
      </div>

      {/* 본문 전체: 헤더 제외 + InputBox 제외 */}
      <div className="pt-[60px] pb-[90px] pl-1 h-[calc(100vh-60px)] flex overflow-hidden">
        <SideBar />
        {/* 사이드바 */}

        {/* 채팅영역 */}
        <div className="flex-1 overflow-y-auto scrollbar-custom flex justify-center">
          <div className="w-[740px]">
            <ChatSection
              sessionId={sessionId}
              sessionMessages={sessionMessages}
              getBotChat={getBotChat}
            />
          </div>
        </div>
      </div>

      {/* 고정된 InputBox */}
      <div className="fixed bottom-3 w-full flex justify-center bg-white z-20">
        <div className="w-[740px]">
          <ChatInputBox sessionId={sessionId} fetchMessagesAgain={getBotChat} />
        </div>
      </div>
    </div>
  );
};

export default ChatDetailPage;
