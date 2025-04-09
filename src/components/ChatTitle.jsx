import { useContext, useState, useEffect, useRef } from 'react';
import { ChatContext } from '../contexts/ChatContext';

// 헤더용
import { IconEdit } from '../utils/icons';
/**
 * @param {boolean} isHeader - Header에서 사용하는 경우 true (수정 아이콘 표시)
 */

// 기본값 false (헤더에서 안 쓸 애임)
const ChatTitle = ({ isHeader = false }) => {
  // 전체 세션과 현재 사용자가 선택한 세션 가져옴
  const { chatSessions, currentSessionId, setChatSessions } = useContext(ChatContext);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  // 현재 선택된 세션 찾아서 currentSession에 저장
  const currentSession = chatSessions.find((session) => session.id === currentSessionId);

  // 타이틀 설정되어있는지 확인
  const isPlaceholder = currentSession.title === '제목을 입력해주세요.';

  // 제목이 바뀌면 inputValue도 초기화
  useEffect(() => {
    setInputValue(currentSession.title);
  }, [currentSession.title]);

  // input에 포커스 주기
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // 선택된 세션이 없을 경우 예외 처리 (ChatTitle 나오지 않음)
  if (!currentSession) return null;

  // 저장 함수
  const handleSave = () => {
    const trimmed = inputValue.trim();
    if (trimmed === '') return; // 빈 값은 저장 안 함
    setChatSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId ? { ...session, title: trimmed } : session
      )
    );
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false); // ESC 눌렀을 때 취소
      setInputValue(currentSession.title); // 원래 제목 복원
    }
  };

  // 너비 계산 함수
  const calculateInputWidth = (text) => {
    let width = 0;
    for (let char of text) {
      if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(char)) {
        width += 13; // 한글
      } else if (/[A-Z]/.test(char)) {
        width += 10; // 영어 대문자
      } else if (/[a-z]/.test(char)) {
        width += 8; // 영어 소문자
      } else if (/\d/.test(char)) {
        width += 9; // 숫자
      } else {
        width += 10; // 특수문자 등 기타
      }
    }
    return Math.max(width + 20, 60); // 여유 패딩 + 최소 너비 보장
  };

  return (
    <div
      className={`
    flex items-center gap-[8px] sm:gap-[10px] text-[14px] sm:text-[16px] leading-[1]
    ${isPlaceholder ? 'text-gray/80' : 'text-gray'} font-medium
    px-[12px] sm:px-[16px] py-[6px] sm:py-[7px] rounded-[10px]
    max-w-full sm:max-w-[1000px]
    cursor-pointer hover:bg-gray-stroke03
    transition-all duration-150 ease-in-out
  `}
      onDoubleClick={() => setIsEditing(true)}
    >
      {/* 텍스트 부분만 수정 가능 */}
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className=" w-auto min-w-[30px] max-w-[1000px]
          bg-transparent border-none outline-none
          focus:outline-none focus:ring-0
          text-[16px] leading-[1] text-gray/80 font-medium truncat"
          style={{ width: `${calculateInputWidth(inputValue)}px` }} //입력된 글자에 따라 길이 유동적으로
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span
          className={`w-auto text-[16px] leading-[1] ${isPlaceholder ? 'text-gray/80' : 'text-gray'} font-medium truncate`}
        >
          {currentSession.title}
        </span>
      )}

      {/* 아이콘은 항상 유지 */}
      {isHeader && (
        <img
          src={IconEdit}
          alt="수정 아이콘"
          className="w-[12px] h-auto cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        />
      )}
    </div>
  );
};

export default ChatTitle;
