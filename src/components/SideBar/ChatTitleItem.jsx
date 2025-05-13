import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../contexts/ChatContext';

import TextOrInput from '../TextOrInput';
import BookMark from './BookMark';

const ChatTitleItem = ({ session, isSelected }) => {
  const { updateChatTitle, setCurrentSessionId, setSidebarOpen } = useContext(ChatContext);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(session.title);
  const nav = useNavigate();

  const clickTimeout = useRef(null); // ✅ 클릭 타이머 관리

  useEffect(() => {
    setInputValue(session.title);
  }, [session.title]);

  useEffect(() => {
    if (isEditing) {
      const timer = setTimeout(() => {
        const input = document.getElementById(`input-${session.sessionId}`);
        if (input) {
          input.focus();
          input.select();
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isEditing, session.sessionId]);

  // 타이틀 수정 후 저장
  const handleSave = async () => {
    const trimmed = inputValue.trim(); //앞뒤 공백 제거
    if (trimmed === '') return;

    await updateChatTitle(session.sessionId, trimmed); // API 연동
    setIsEditing(false);
  };

  // ✅ 세션 선택 (페이지 이동)
  const handleSelectSession = () => {
    setCurrentSessionId(session.sessionId);
    nav(`/chat/${session.sessionId}`);
    setSidebarOpen(false);
  };

  // ✅ 클릭 처리: 클릭과 더블클릭 분리
  const handleClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }

    clickTimeout.current = setTimeout(() => {
      if (!isEditing) {
        handleSelectSession();
      }
    }, 200); // 200ms 안에 더블클릭 들어오면 아래에서 취소됨
  };

  const handleDoubleClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current); // ✅ 단일 클릭 취소
      clickTimeout.current = null;
    }
    setIsEditing(true); // ✅ 제목 수정 시작
  };

  return (
    <div
      className={`
        flex items-center justify-between
        px-[10px] py-[8px] rounded-[10px] text-gray/80
         cursor-pointer
        ${isSelected ? 'bg-gray-stroke04' : 'hover:bg-gray-stroke02'}
      `}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex items-center flex-1 min-w-0" title={session.title}>
        <TextOrInput
          id={`input-${session.sessionId}`}
          value={inputValue}
          isEditing={isEditing}
          onStartEdit={() => setIsEditing(true)}
          onChange={setInputValue}
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false);
            setInputValue(session.title);
          }}
          className="text-[15px] font-medium leading-[1.4] truncate overflow-hidden whitespace-nowrap"
        />
      </div>

      <BookMark />
    </div>
  );
};

export default ChatTitleItem;
