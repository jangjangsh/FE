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

  // const calculateInputWidth = (text = '') => {/

  return (
    <div
      className={`
    flex items-center gap-[12px] text-[16px] leading-[1.4]
    ${isPlaceholder ? 'text-gray/80' : 'text-gray'} font-medium
    px-[10px] py-[6px] rounded-[10px]
    max-w-5xl 
    cursor-pointer transition-all duration-150 ease-in-out
    ${isEditing ? 'bg-gray-stroke03' : 'hover:shadow-custom'}
  `}
      onDoubleClick={() => setIsEditing(true)}
    >
      <TextOrInput
        value={inputValue}
        isEditing={isEditing}
        onChange={setInputValue}
        onSave={handleSave}
        onCancel={() => {
          setIsEditing(false);
          setInputValue(currentSession.title || '');
        }}
        className=" text-[16px] font-medium leading-[1.4] outline-none bg-transparent"
      />
      <img
        src={IconEdit}
        alt="수정 아이콘"
        className="w-[12px] h-auto cursor-pointer flex-shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
      />
    </div>
  );
};

export default ChatTitle;
