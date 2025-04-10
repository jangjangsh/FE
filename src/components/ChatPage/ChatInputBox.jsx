import { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import ChatTextInput from './ChatTextInput';
import SendButton from './SendButton';
import TypeSelector from './TypeSelector';
import TypeSelectorBox from './TypeSelectorBox';

const mockData = [
  {
    id: 1,
    skinTypes: ['SENSITIVE', 'DRY'],
    message: '1번 메세지',
  },
  {
    id: 2,
    skinTypes: ['SENSITIVE'],
    message: '2번 메세지',
  },
];

// 채팅 입력창 컨테이너
const ChatInputBox = () => {
  const [input, setInput] = useState(''); // 채팅 입력 작성
  const [selectedTypes, setSelectedTypes] = useState([]); // 피부 타입 선택
  const [chatMessages, setChatMessages] = useState(mockData); // 메세지, 피부 타입 선택 저장
  // 채팅 id 혹시 몰라 작성
  const idRef = useRef(3);

  // 피부 타입 선택 모달창 open, close
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const nav = useNavigate();

  // 채팅 메세지 전송
  const handleSend = () => {
    if (!input.trim()) return;

    const sessionId = idRef.current++;

    const newMessage = {
      id: sessionId,
      skinTypes:
        selectedTypes.length > 0 ? selectedTypes : ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'], // 기본값 설정
      message: input,
    };

    // 기존 메시지 + 새 메시지
    setChatMessages((prev) => [...prev, newMessage]);
    // nav(`/chat/${sessionId}`);

    // 입력창 초기화
    setInput('');
  };

  return (
    <section className="w-full pb-3">
      <div
        className="
      fixed flex flex-col w-[760px]
      rounded-[20px]
      border border-gray-stroke07 focus-within:border-gray-stroke10
      shadow-[0_2px_10px_rgba(0,0,0,0.03)] focus-within:shadow-[0_2px_10px_rgba(0,0,0,0.05)]
    "
      >
        <div className="flex w-full px-[12px] py-[10px] border-b border-gray-stroke07">
          <ChatTextInput input={input} setInput={setInput} />
          <SendButton onClick={handleSend} />
        </div>
        <div className="flex w-full items-center p-[10px]">
          <TypeSelectorBox
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
          />
        </div>
      </div>
    </section>
  );
};

export default ChatInputBox;
