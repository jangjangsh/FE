import { useChat } from '../../contexts/ChatContextsh';
import ChatTextInput from './ChatTextInput';
import SendButton from './SendButton';
import TypeSelectorBox from './TypeSelectorBox';
import { useLocation } from 'react-router-dom';
import { createChatSession, sendChatMessages } from '../../utils/chat';
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

  // 새로운 세션 생성 후 메세지 전송, 세션 이동
  const handleTestPost = async () => {
    if (!input.trim()) return;
    // user 메세지 전체 body
    const body = {
      message: input,
      skinTypes:
        selectedTypes.length > 0 ? selectedTypes : ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
    };

    console.log('👉 전송 데이터:', body);

    try {
      // 세션 생성
      const session = await createChatSession(); // 백엔드에 새 세션 만들고 받아온 응답 데이터 (createChatSession 호출해서 요청이 간 결과값)
      const newSessionId = session.sessionId;

      // 메시지 전송 후
      const botResponses = await sendChatMessages(newSessionId, body.message, body.skinTypes);

      const botMessages = botResponses.map((res) => ({
        sender: res.sender,
        message: res.message,
        skinTypes: res.skinType,
      }));
      // 🔹 사용자 메시지 + 봇 메시지 합치기
      setSessionMessages((prev) => [...prev, body, ...botMessages]);
      setInput(''); // 입력창 비우기

      // 🔹 페이지 이동
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
