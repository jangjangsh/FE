import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatTextInput from './ChatTextInput';
import SendButton from './SendButton';
import TypeSelector from './TypeSelector';
import TypeSelectorBox from './TypeSelectorBox';

const mockData = [
  {
    id: 1,
    skinTypes: 'SENSITIVE',
    message: '1번 메세지',
  },
  {
    id: 2,
    skinTypes: 'SENSITIVE',
    message: '2번 메세지',
  },
];

// 채팅 입력창 컨테이너
const ChatInputBox = () => {
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState(mockData);
  const idRef = useRef(3);
  const nav = useNavigate();

  const handleSend = () => {
    if (!input.trim()) return;

    const sessionId = idRef.current++;

    const newMessage = {
      id: sessionId,
      skinTypes: 'DRY', // 지금은 임의로 고정값
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
        fixed
        flex flex-col w-[760px]
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
          <TypeSelectorBox />
        </div>
      </div>
    </section>
  );
};

export default ChatInputBox;
