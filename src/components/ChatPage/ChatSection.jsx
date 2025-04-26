import ChatInputBox from './ChatInputBox';
import UserChat from './UserChat';
import BotChat from './BotChat';
import ChatMessageList from './ChatMessageList';
import { getChatMessages } from '../../utils/chat';
import { useEffect, useState } from 'react';

const ChatSection = ({ sessionId }) => {
  // const { sessionMessages } = useChat();
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
    <div className="flex-col w-[760px] h-full bg-white">
      <div className="overflow-y-auto h-full pb-[80px] px-1 space-y-5 scrollbar-hide">
        <ChatMessageList allChatMessages={allChatMessages} sessionId={sessionId} />
        {/* <UserChat sessionMessages={sessionMessages} />
        <BotChat sessionMessages={sessionMessages} /> */}
      </div>

      {/* 입력창 - 고정 */}
      <div className="fixed bottom-0 w-full flex justify-center bg-white z-10 pb-3">
        <ChatInputBox fetchMessagesAgain={getBotChat} sessionId={sessionId} />
      </div>
    </div>
  );
};

export default ChatSection;
