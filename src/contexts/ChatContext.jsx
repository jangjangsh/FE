// src/contexts/ChatContext.jsx
// ✨ 백엔드 연결 시 수정필요한 부분은 해당 이모티콘 주석 ✨
// 현재 ChatContext는 사이드바/헤더 구현을 위한 최소 상태만 포함되어 있습니다.
// 메시지 전송, 로딩, 에러처리 등은 추후 챗봇 파트 구현 시 다시 주석 해제 or 수정해주세요.

import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // UUID 생성용 (npm install uuid) ✨

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // 모든 대화 세션(채팅방)을 저장하는 배열
  const [chatSessions, setChatSessions] = useState([]);
  // 지금 사용자가 보고 있는 대화의 ID, 사이드바에서 대화를 클릭하면 이 값이 바뀜
  const [currentSessionId, setCurrentSessionId] = useState(null);

  // ❌ 사이드바/헤더에선 사용하지 않음
  // 챗봇 응답 기다리는 중인지 아닌지 판단
  // const [isLoading, setIsLoading] = useState(false);
  // 에러가 발생하면 이 상태에 메시지를 담아둠
  // const [error, setError] = useState(null);

  // 새로운 대화 세션 생성
  const createChatSession = ({ mode = 'product_detail', skin_type = null }) => {
    // ✨ 여기부터 백엔드 연결 후 수정필요
    const newId = uuidv4(); // 고유 ID 자동 생성 (✨백 연결 전 임시 생성 ID)
    const newSession = {
      id: newId,
      title: '제목을 입력해주세요.', // 기본 제목
      mode, // 대화 모드
      skin_type, // 사용자 선택 피부타입
      is_bookmark: false, // 즐겨찾기 여부 초기값
      created_at: new Date().toISOString(), // 생성 시간
      messages: [], // 빈 메시지 목록
    };
    // ✨여기까지

    // 이걸 chatSessions 배열에 추가하고
    // 새로 만든 대화를 현재 활성 대화로 지정
    setChatSessions((prev) => [...prev, newSession]);
    setCurrentSessionId(newId); // ✨ 나중에 res.data.id로 변경 필요
    return newId;
  };

  // ❌ 사이드바/헤더에선 사용하지 않음
  // 메시지 추가
  // const addMessage = (sessionId, { sender, message }) => {
  //   setChatSessions((prev) =>
  //     prev.map((session) =>
  //       session.id === sessionId
  //         ? {
  //             ...session,
  //             messages: [
  //               ...session.messages,
  //               {
  //                 sender, // 'user' 또는 'bot'
  //                 message, // 실제 메시지 내용
  //                 created_at: new Date().toISOString(), // ✨ 실제 백엔드에서 주는 시간 created_at
  //               },
  //             ],
  //             // 만약 이 대화의 제목이 "새 대화"라면?
  //             // → 사용자가 처음 보낸 메시지 앞 20글자를 제목으로 자동 설정
  //             // title:
  //             //   session.title === '새 대화' && sender === 'user'
  //             //     ? message.slice(0, 20)
  //             //     : session.title,
  //           }
  //         : session
  //     )
  //   );
  //   // ✨ 즐겨찾기 상태를 백엔드에 저장하려면 여기에 PATCH API 호출 추가!
  // };

  // 즐겨찾기 토글
  // 해당 대화의 즐겨찾기 상태를 토글(toggle)
  const toggleBookmark = (sessionId) => {
    // chatSessions라는 상태를 업데이트(set)
    setChatSessions((prev) =>
      // 이전 배열(prev)의 각 session을 순회하며 새 배열을 만들어 리턴
      prev.map((session) =>
        // 만약 현재 순회 중인 session.id가 우리가 토글하려는 대상(sessionId)과 같다면 기존 is_bookmark 값이 true면 false로, false면 true로 바꿔줌
        session.id === sessionId ? { ...session, is_bookmark: !session.is_bookmark } : session
      )
    );
  };

  // ❌ 사이드바/헤더에선 사용하지 않음
  // 에러 핸들링
  // 에러가 있을 때 null로 초기화
  // const clearError = () => setError(null);

  return (
    <ChatContext.Provider
      value={{
        chatSessions,
        currentSessionId,
        createChatSession,
        setCurrentSessionId,
        toggleBookmark,

        // ❌ 사이드바/헤더에선 사용하지 않음
        // isLoading,
        // error,
        // addMessage,
        // setIsLoading,
        // setError,
        // clearError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
