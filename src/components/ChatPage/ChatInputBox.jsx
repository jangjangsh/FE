import { useChat } from '../../contexts/ChatContext';
import ChatTextInput from './ChatTextInput';
import SendButton from './SendButton';
import TypeSelectorBox from './TypeSelectorBox';
import { useLocation } from 'react-router-dom';
import { createChatSession, sendChatMessagesStream } from '../../utils/chat';
import { useNavigate } from 'react-router-dom';

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
    skinTypes,
    setChatSessions,
    setCurrentSessionId,
    setLiveBotMessage,
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
        selectedTypes.length > 0 ? selectedTypes : ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
    };

    console.log('👉 전송 데이터:', body);

    try {
      let currentSessionId = sessionId;
      // 만약 현재 sessionId가 없으면,
      if (!currentSessionId) {
        const { newSession, updatedSessions } = await createChatSession();
        currentSessionId = newSession.sessionId;
        // ➔ 전역 세션 목록 업데이트
        setChatSessions(updatedSessions);

        // ➔ 현재 선택된 세션 ID도 업데이트 (헤더용)
        setCurrentSessionId(newSession.sessionId);

        // ✅ 먼저 메세지를 보내고
        await sendChatMessagesStream(
          currentSessionId,
          body,
          (chunk) => {
            // ✅ 실시간 응답 조각 처리: chunk는 string
            setLiveBotMessage((prev) => prev + chunk); // 이건 ChatContext나 local state로 만들어야 함
          },
          () => {
            // ✅ 스트리밍 끝났을 때 처리
            fetchMessagesAgain(); // 메시지 전체 다시 받아옴
          }
        );
        if (selectedTypes.length === 0) {
          setSelectedTypes(skinTypes); // ✅ 여기서 전체 선택해주기
          // ✅ 메세지 보내기가 성공하면 이동!
          navigate(`/chat/${currentSessionId}`);
        }

        // ❌ fetchMessagesAgain 여기선 하지 마.
      } else {
        await sendChatMessagesStream(
          currentSessionId,
          body,
          (chunk) => {
            // ✅ 실시간 응답 조각 처리: chunk는 string
            setLiveBotMessage((prev) => prev + chunk); // 이건 ChatContext나 local state로 만들어야 함
          },
          () => {
            // ✅ 스트리밍 끝났을 때 처리
            fetchMessagesAgain(); // 메시지 전체 다시 받아옴
          }
        );
        if (selectedTypes.length === 0) {
          setSelectedTypes(skinTypes); // ✅ 여기서 전체 선택해주기
        }
        fetchMessagesAgain(); // 기존 세션일 때만 즉시 다시 불러오기
      }

      setInput('');

      setInput(''); // 입력창 비우기
    } catch (error) {
      console.error('❌ 세션 생성 또는 메시지 전송 실패:', error);
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
