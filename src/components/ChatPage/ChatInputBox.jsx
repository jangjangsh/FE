import { useChat } from '../../contexts/ChatContextsh';
import ChatTextInput from './ChatTextInput';
import SendButton from './SendButton';
import TypeSelectorBox from './TypeSelectorBox';
import { useLocation } from 'react-router-dom';
import { createChatSession, sendChatMessages } from '../../utils/chat';
import { useNavigate } from 'react-router-dom';

// 채팅 입력창 컨테이너
const ChatInputBox = ({ sessionId, fetchMessagesAgain }) => {
  const {
    input,
    setInput,
    selectedTypes,
    setSelectedTypes,
    isDropdownOpen,
    setIsDropdownOpen,
    sessionMessages,
  } = useChat();

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
        selectedTypes.length > 0 ? selectedTypes : ['DRY', 'OILY', 'SENSITIVE', 'COMBINED'],
    };

    console.log('👉 전송 데이터:', body);

    try {
      let currentSessionId = sessionId;
      // 만약 현재 sessionId가 없으면,
      if (!currentSessionId) {
        // 세션 생성 api로 값 전달받음 (세션 생성 완료)
        const session = await createChatSession();
        // 전달받은 session의 sessionId 값을 저장하기
        currentSessionId = session.sessionId;
        navigate(`/chat/${currentSessionId}`);
      }

      // 기존 sessionId 있으면 디테일 페이지에선 메세지만 전송
      await sendChatMessages(currentSessionId, body);

      setInput(''); // 입력창 비우기
      fetchMessagesAgain();
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
