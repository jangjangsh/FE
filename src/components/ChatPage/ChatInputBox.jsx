import { useChat } from '../../contexts/ChatContext';
import ChatTextInput from './ChatTextInput';
import SendButton from './SendButton';
import TypeSelectorBox from './TypeSelectorBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { createChatSession, sendChatMessages } from '../../utils/chat';
import { getChatMessages } from '../../utils/chat';

const ChatInputBox = ({ sessionId, fetchMessagesAgain, isTypeSelected = () => false, isClick }) => {
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
    setPendingUserMessage,
  } = useChat();

  const location = useLocation();
  const isDetailPage = location.pathname.includes('/chat/');
  const navigate = useNavigate();

  const handleTestPost = async () => {
    if (!input.trim()) return;

    const cleanedSkinTypes = selectedTypes.filter(Boolean).map((s) => String(s).trim());

    const userMessage = {
      id: userId.current++,
      sender: 'USER',
      message: input,
      skinTypes:
        cleanedSkinTypes.length > 0
          ? cleanedSkinTypes
          : ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
    };

    setPendingUserMessage(userMessage);
    setIsLoading(true);
    setInput('');

    let currentSessionId = sessionId;

    try {
      if (!currentSessionId) {
        const { newSession, updatedSessions } = await createChatSession();
        currentSessionId = newSession.sessionId;

        setChatSessions(updatedSessions);
        setCurrentSessionId(currentSessionId);
        setSessionMessages([userMessage]); // ✅ 무조건 먼저 유저 메시지 보여주기

        setTimeout(() => {
          navigate(`/chat/${currentSessionId}`);
        }, 10);

        await sendChatMessages(userMessage, currentSessionId);
        const updatedMessages = await getChatMessages(currentSessionId);
        setSessionMessages(updatedMessages);
      } else {
        setSessionMessages((prev) => [...prev, userMessage]); // ✅ 무조건 유저 메시지 먼저 추가

        await sendChatMessages(userMessage, currentSessionId);
        const updatedMessages = await getChatMessages(currentSessionId);
        setSessionMessages(updatedMessages);
      }

      fetchMessagesAgain?.();

      if (selectedTypes.length === 0) {
        setSelectedTypes(skinTypes);
      }
    } catch (err) {
      console.error('❌ 세션 생성 또는 메시지 전송 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };

  const onDelete = (target) => {
    const filtered = selectedTypes.filter((type) => type !== target);
    setSelectedTypes(filtered);
  };

  return (
    <section className="w-full pb-3">
      <div className="bg-white flex flex-col w-[740px] rounded-[25px] border-[1.5px] border-gray-stroke05 focus-within:border-gray-stroke07">
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
