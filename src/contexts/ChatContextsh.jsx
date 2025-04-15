import { createContext, useContext, useState, useRef } from 'react';

export const ChatContextsh = createContext();

export const ChatProvider = ({ children }) => {
  const [sessionMessages, setSessionMessages] = useState([]); // 채팅방 별 메세지 (봇, 유저 구분)
  const [input, setInput] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const idRef = useRef(0);

  const handleSend = () => {
    if (!input.trim()) return;

    // const sessionId = idRef.current; // 이미 만들어진 세션 ID가 있다고 가정

    const userMessage = {
      id: idRef.current++,
      sender: 'USER',
      skinTypes:
        selectedTypes.length > 0 ? selectedTypes : ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'], // 기본값 설정
      message: input,
    };

    // 메시지 합쳐서 저장
    // 세션 - 백한테 코드 받고, 봇 메세지를 이 sessionMessages에 추가해줄 것 -> 필터링하여 보여줌
    setSessionMessages((prev) => [...prev, userMessage]);
    // 입력 초기화
    setInput('');
  };

  return (
    <ChatContextsh.Provider
      value={{
        input, // 사용자가 입력한 메세지
        setInput,
        selectedTypes, // 피부 타입 선택
        setSelectedTypes,
        isDropdownOpen, // 드롭다운 박스
        setIsDropdownOpen,
        sessionMessages, // 객체에 채팅 메세지가 배열로 저장됨
        setSessionMessages,
        handleSend, // 새로운 메세지 전송
      }}
    >
      {children}
    </ChatContextsh.Provider>
  );
};
export const useChat = () => useContext(ChatContextsh);
// 연결 코드

// const createChatSession = async () => {
//   // 1. 백엔드에 세션 생성 요청
//   const res = await fetch("http://localhost:8000/api/chat/sessions", {
//     method: "POST",
//   });
//   const data = await res.json();
//   const newSessionId = data.sessionId; // ✅ 백엔드가 넘겨준 sessionId

//   // 2. 사용자 메시지 저장
//   const newMessage = {
//     sender: 'USER',
//     message: input,
//     skinTypes:
//       selectedTypes.length > 0
//         ? selectedTypes
//         : ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
//   };

//   setAllChatSessions((prev) => ({
//     ...prev,
//     [newSessionId]: [newMessage],
//   }));

//   return newSessionId;
// };
