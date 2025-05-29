import { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  fetchChatSessions as fetchChatSessionsAPI,
  createChatSession as createChatSessionAPI,
  updateChatTitle as updateChatTitleAPI,
  deleteChatSession as deleteChatSessionAPI,
} from '../utils/chat'; // 위치는 상황에 따라 조정
import { useAuth } from './AuthContext'; // ✅ 추가
import { sendChatMessages } from '../utils/chat';

export const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const { isLoggedIn } = useAuth(); // ❗ 필요 시 사용
  const accessToken = localStorage.getItem('accessToken'); // ✅ 토큰 직접 가져옴

  // 서현
  const [sessionMessages, setSessionMessages] = useState([]); // 채팅방 별 메세지 (봇, 유저 구분)
  const [input, setInput] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [skinTypes, setSkinTypes] = useState([
    'DRY',
    'OILY',
    'SENSITIVE',
    'COMBINATION', // ✅ 선택할 수 있는 전체 타입 목록
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useRef(0);
  const [revealedBotBlocks, setRevealedBotBlocks] = useState({});
  const idRef = useRef(0);
  const [pendingUserMessage, setPendingUserMessage] = useState(null);
  // 메세지 내용 초기화
  const resetSessionMessages = () => {
    setSessionMessages([]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!currentSessionId) {
      alert('세션이 없습니다.');
      return;
    }

    const expandSkinTypes = (types) =>
      types.flatMap((type) => ['1', '2', '3'].map((suffix) => `${type}${suffix}`));

    const expandedTypes =
      selectedTypes.length > 0
        ? expandSkinTypes(selectedTypes)
        : expandSkinTypes(['DRY', 'OILY', 'SENSITIVE', 'COMBINATION']);

    const userMessage = {
      id: idRef.current++,
      sender: 'USER',
      skinTypes: expandedTypes,
      message: input,
    };

    // 1. 유저 메시지 화면에 먼저 보여주기
    setSessionMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      // 2. API 전송
      const botResponses = await sendChatMessages(currentSessionId, {
        message: input,
        skinTypes: expandedTypes,
      });

      // 3. BOT 응답을 상태에 반영
      setSessionMessages((prev) => [...prev, ...botResponses]);
    } catch (err) {
      alert('메시지 전송 실패');
    }
  };

  const markBotBlockAsRevealed = (sessionId, blockId) => {
    const key = `${sessionId}:${blockId}`;
    setRevealedBotBlocks((prev) => ({ ...prev, [key]: true }));
  };

  const isBotBlockRevealed = (sessionId, blockId) => {
    return !!revealedBotBlocks[`${sessionId}:${blockId}`];
  };

  // 미경
  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const fetchChatSessions = async () => {
    const data = await fetchChatSessionsAPI();
    setChatSessions(data);
  };

  useEffect(() => {
    fetchChatSessions();
  }, []);

  const createChatSession = async () => {
    const result = await createChatSessionAPI();

    let newSession, updatedSessions;

    // result 안에 newSession, updatedSessions가 둘 다 있을 경우
    if (result.newSession && result.updatedSessions) {
      newSession = result.newSession;
      updatedSessions = result.updatedSessions;
    } else {
      // 그냥 newSession 하나만 리턴된 경우
      newSession = result;
      // 새로 목록 요청
      updatedSessions = await fetchChatSessions();
    }

    if (!newSession || !newSession.sessionId) {
      console.error('세션 생성 실패: sessionId 없음');
      throw new Error('세션 생성 실패');
    }

    setCurrentSessionId(newSession.sessionId);
    setChatSessions(updatedSessions);

    return newSession.sessionId;
  };

  // 제목 수정
  const updateChatTitle = async (sessionId, newTitle) => {
    const updated = await updateChatTitleAPI(sessionId, newTitle, accessToken);
    setChatSessions((prev) =>
      prev.map((s) =>
        s.sessionId === sessionId
          ? { ...s, title: updated.title, isBookmark: updated.isBookmark }
          : s
      )
    );
  };

  const toggleBookmark = (sessionId) => {
    setChatSessions((prev) =>
      prev.map((s) => (s.sessionId === sessionId ? { ...s, isBookmark: !s.isBookmark } : s))
    );
  };

  // 채팅삭제
  const deleteChatSession = async (sessionId) => {
    const res = await deleteChatSessionAPI(sessionId);
    if (res.success) {
      setChatSessions((prev) => prev.filter((s) => s.sessionId !== sessionId));
      if (currentSessionId === sessionId) {
        setCurrentSessionId(null); // 삭제된 세션이면 선택 해제
      }
    } else {
      alert(res.error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        // 서현
        input, // 사용자가 입력한 메세지
        setInput,
        selectedTypes, // 피부 타입 선택
        setSelectedTypes,
        isDropdownOpen, // 드롭다운 박스
        setIsDropdownOpen,
        sessionMessages, // 객체에 채팅 메세지가 배열로 저장됨
        setSessionMessages,
        handleSend, // 새로운 메세지 전송
        skinTypes, // 모든 피부 스킨 타입
        setSkinTypes,
        revealedBotBlocks,
        markBotBlockAsRevealed,
        isBotBlockRevealed,
        isLoading,
        setIsLoading,
        userId,
        isLoggedIn,
        resetSessionMessages,
        pendingUserMessage,
        setPendingUserMessage,

        // 미경
        chatSessions,
        currentSessionId,
        isSidebarOpen,
        createChatSession,
        fetchChatSessions,
        updateChatTitle,
        setCurrentSessionId,
        setSidebarOpen,
        toggleBookmark,
        setChatSessions,
        deleteChatSession,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const useChat = () => useContext(ChatContext);
