import { useChat } from '../../contexts/ChatContextsh';
import ChatTextInput from './ChatTextInput';
import SendButton from './SendButton';
import TypeSelectorBox from './TypeSelectorBox';
import { useLocation } from 'react-router-dom';
import { createChatSession, sendChatMessages } from '../utils/chat';
import { useNavigate } from 'react-router-dom';

// 채팅 입력창 컨테이너
const ChatInputBox = () => {
  const {
    input,
    setInput,
    selectedTypes,
    setSelectedTypes,
    isDropdownOpen,
    setIsDropdownOpen,
    // handleSend,
    sessionMessages,
    setSessionMessages,
  } = useChat();
  // const nav = useNavigate();
  // dropdown 위로 열지 아래로 열지 판단
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/chat/');
  const navigate = useNavigate();

  // const onSend = () => {
  //   handleSend();
  //   // nav('/chat/1'); // 예시: sessionId를 1번으로 가정
  // };

  const handleTestPost = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: 'USER',
      skinTypes:
        selectedTypes.length > 0 ? selectedTypes : ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
      message: input,
    };

    setSessionMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const session = await createChatSession(); // 🔹 새로운 세션 생성
      const newSessionId = session.sessionId;

      // 🔹 백엔드에 메시지 전송
      const botResponse = await sendChatMessages(
        newSessionId,
        userMessage.message,
        userMessage.skinTypes
      );

      const botMessage = {
        sender: 'BOT',
        message: botResponse.message,
      };
      setSessionMessages((prev) => [...prev, botMessage]);

      // 🔹 DetailPage로 이동
      navigate(`/chat/${newSessionId}`);
    } catch (error) {
      console.error('❌ 세션 생성 또는 메시지 전송 실패:', error);
    }
  };

  return (
    <section className="w-full pb-3">
      <div
        className="
      flex flex-col w-[760px]
      rounded-[20px]
      border border-gray-stroke07 focus-within:border-gray-stroke10
      shadow-[0_2px_10px_rgba(0,0,0,0.03)] focus-within:shadow-[0_2px_10px_rgba(0,0,0,0.05)]
    "
      >
        <div className="flex w-full px-[12px] py-[10px] border-b border-gray-stroke07">
          <ChatTextInput input={input} setInput={setInput} />
          <SendButton onClick={handleTestPost} />
        </div>
        <div className="flex w-full items-center p-[12px]">
          <TypeSelectorBox
            sessionMessages={sessionMessages}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            direction={isDetailPage ? 'up' : 'down'}
          />
        </div>
      </div>
    </section>
  );
};

export default ChatInputBox;
