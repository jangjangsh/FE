// ✅ ChatTitle.jsx (백엔드 연동 기준, 메시지 전까지는 타이틀 없음 + 메인에서 제외)
import { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChatContext } from '../../contexts/ChatContext';
import TextOrInput from '../TextOrInput';
import { IconEdit } from '../../utils/icons';

const ChatTitle = () => {
  const { chatSessions, currentSessionId, updateChatTitle } = useContext(ChatContext);

  const location = useLocation();
  const currentSession = chatSessions.find((s) => s.sessionId === currentSessionId);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (currentSession && !isEditing) {
      setInputValue(currentSession.title || '');
    }
  }, [currentSession?.title, isEditing]);

  if (location.pathname === '/chat' || !currentSession) return null;

  const isPlaceholder = !currentSession.title || currentSession.title === '제목을 입력해주세요.';

  // 타이틀 수정 후 저장
  const handleSave = async () => {
    const trimmed = inputValue.trim(); //앞뒤 공백 제거
    if (trimmed === '') return;

    await updateChatTitle(currentSession.sessionId, trimmed); // API 연동
    setIsEditing(false);
  };

  const calculateInputWidth = (text = '') => {
    let width = 0;
    for (let char of text.toString()) {
      if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(char)) width += 13;
      else if (/[A-Z]/.test(char)) width += 10;
      else if (/[a-z]/.test(char)) width += 8;
      else if (/\d/.test(char)) width += 9;
      else if (char === ' ') width += 4;
      else width += 10;
    }
    return Math.max(width + 15, 100);
  };
  console.log('chatSessions:', chatSessions);
  console.log('currentSessionId:', currentSessionId);
  console.log('currentSession:', currentSession);

  return (
    <div
      className={`
        flex items-center gap-[8px] sm:gap-[10px] text-[14px] sm:text-[16px] leading-[1.4]        ${isPlaceholder ? 'text-gray/80' : 'text-gray'} font-medium
        px-[10px] sm:px-[14px] py-[6px] sm:py-[8px] rounded-[10px]
        max-w-full sm:max-w-[1000px]
        cursor-pointer transition-all duration-150 ease-in-out
        ${isEditing ? 'bg-gray-stroke03' : 'hover:bg-gray-stroke03'}
      `}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="flex-1" style={{ width: `${calculateInputWidth(inputValue)}px` }}>
        <TextOrInput
          value={inputValue}
          isEditing={isEditing}
          onStartEdit={() => setIsEditing(true)}
          onChange={setInputValue}
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false);
            setInputValue(currentSession.title || '');
          }}
          className="text-[16px] font-medium leading-[1.4] truncate min-w-[30px] max-w-[1000px] w-full"
        />
      </div>
      <img
        src={IconEdit}
        alt="수정 아이콘"
        className="w-[12px] h-auto cursor-pointer self-center"
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
      />
    </div>
  );
};

export default ChatTitle;
