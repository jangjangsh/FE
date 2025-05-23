import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext'; // ✅ 추가
import TextOrInput from '../TextOrInput';
import BookMark from './BookMark';
import SessionDeleteBtn from './SessionDeleteBtn';
import { deleteChatSession } from '../../utils/chat';

const ChatTitleItem = ({ session, isSelected }) => {
  const {
    updateChatTitle,
    setCurrentSessionId,
    setSidebarOpen,
    fetchChatSessions, // ✅ 세션 목록 다시 불러오기
  } = useContext(ChatContext);

  const { isLoggedIn } = useAuth(); // ✅ 로그인 여부 확인
  const accessToken = localStorage.getItem('accessToken'); // ✅ 로컬에서 직접 꺼냄

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(session.title);
  const [showMenu, setShowMenu] = useState(false);

  const nav = useNavigate();
  const clickTimeout = useRef(null);
  const menuRef = useRef();

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

  const handleSave = async () => {
    const trimmed = inputValue.trim();
    if (trimmed === '') return;
    await updateChatTitle(session.sessionId, trimmed);
    setIsEditing(false);
  };

  const handleSelectSession = () => {
    setCurrentSessionId(session.sessionId);
    nav(`/chat/${session.sessionId}`);
    setSidebarOpen(false);
  };

  const handleClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
    clickTimeout.current = setTimeout(() => {
      if (!isEditing) {
        handleSelectSession();
      }
    }, 200);
  };

  const handleDoubleClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
    setIsEditing(true);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = async () => {
    if (!isLoggedIn || !accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }
    const result = await deleteChatSession(session.sessionId, accessToken);
    if (result.success) {
      fetchChatSessions(); // ✅ 세션 목록 다시 불러오기
    } else {
      alert(result.error);
    }
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <div
        className={`
          flex items-center justify-between
          px-[10px] py-[8px] rounded-[10px] text-gray/80
          cursor-pointer gap-[12px]
          ${isSelected ? 'bg-gray-stroke04' : 'hover:bg-gray-stroke02'}
        `}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
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
            className="text-[15px] leading-[1.4] truncate overflow-hidden whitespace-nowrap"
          />
        </div>

        <BookMark session={session} />
      </div>

      {showMenu && (
        <div ref={menuRef}>
          <SessionDeleteBtn onClick={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default ChatTitleItem;
