import { useChat } from '../../contexts/ChatContext';
import ChatTextInput from './ChatTextInput';
import SendButton from './SendButton';
import TypeSelectorBox from './TypeSelectorBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { createChatSession, sendChatMessagesStream } from '../../utils/chat';

// 채팅 입력창 컨테이너
const ChatInputBox = ({ sessionId, fetchMessagesAgain, isTypeSelected, isClick }) => {
  const {
    input,
    setInput,
    selectedTypes,
    setSelectedTypes,
    isDropdownOpen,
    setIsDropdownOpen,
    sessionMessages,
    setSessionMessages,
    skinTypes,
    setChatSessions,
    setCurrentSessionId,
    setIsLoading,
    userId,
  } = useChat();

  // dropdown 위로 열지 아래로 열지 판단
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/chat/');
  const navigate = useNavigate();

  // 새로운 세션 생성 후 메세지 전송, 세션 이동
  const handleTestPost = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: userId.current++,
      sender: 'USER',
      message: input,
      skinTypes:
        selectedTypes.length > 0 ? selectedTypes : ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
    };

    setIsLoading(true); // ⬅️ 먼저 로딩 표시
    setInput(''); // ⬅️ 입력창 비우기 우선

    let currentSessionId = sessionId;

    try {
      if (!currentSessionId) {
        const { newSession, updatedSessions } = await createChatSession();
        currentSessionId = newSession.sessionId;
        setChatSessions(updatedSessions);
        setCurrentSessionId(currentSessionId);

        setSessionMessages([userMessage]); // ✅ 이거 먼저

        setTimeout(() => {
          navigate(`/chat/${currentSessionId}`); // ✅ 그 다음에 이동
        }, 0);

        sendChatMessagesStream(userMessage, currentSessionId, (result) => {
          const botMessagesWithId = result.map((msg, index) => ({
            ...msg,
            id: `${Date.now()}-${index}`,
          }));
          setSessionMessages((prev) => [...prev, ...botMessagesWithId]);
          setIsLoading(false);
          fetchMessagesAgain?.();
        });
      } else {
        // 기존 세션이면 유저 메시지 먼저 넣고 스트리밍
        setSessionMessages((prev) => [...prev, userMessage]);

        sendChatMessagesStream(userMessage, currentSessionId, (result) => {
          const botMessagesWithId = result.map((msg, index) => ({
            ...msg,
            id: `${Date.now()}-${index}`,
          }));
          setSessionMessages((prev) => [...prev, ...botMessagesWithId]);
          setIsLoading(false);
          fetchMessagesAgain?.();
        });
      }

      if (selectedTypes.length === 0) {
        setSelectedTypes(skinTypes);
      }
    } catch (err) {
      console.error('❌ 세션 생성 또는 메시지 전송 실패:', err);
      setIsLoading(false);
    }
  };

  const onChangeInput = (e) => {
    setInput(e.target.value);
    console.log(input);
  };

  const onDelete = (target) => {
    const filteredSelectedTypes = selectedTypes.filter((type) => type !== target);
    setSelectedTypes(filteredSelectedTypes);
  };

  return (
    <section className="w-full pb-3 ">
      <div
        className="
        bg-white
      flex flex-col w-[740px]
      rounded-[25px]
      border-[1.5px] border-gray-stroke05 focus-within:border-gray-stroke07
    "
      >
        <div className="flex w-full p-[10px] border-gray-stroke07">
          <ChatTextInput input={input} onChangeInput={onChangeInput} />
          <SendButton onClick={handleTestPost} isInputFilled={input.length > 0} />
        </div>
        <div className="flex w-full items-center px-[14px] pb-[14px]">
          <TypeSelectorBox
            isTypeSelected={isTypeSelected}
            sessionMessages={sessionMessages}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            direction={isDetailPage ? 'up' : 'down'}
            onDelete={onDelete}
            isClick={isClick}
          />
        </div>
      </div>
    </section>
  );
};

export default ChatInputBox;
