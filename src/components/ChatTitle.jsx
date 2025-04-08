import { useContext } from 'react';
import { ChatContext } from '../contexts/ChatContext';

// 헤더용
import { IconEdit } from '../utils/icons';
/**
 * @param {boolean} isHeader - Header에서 사용하는 경우 true (수정 아이콘 표시)
 */

// 기본값 false (헤더에서 안 쓸 애임)
const ChatTitle = ({ isHeader = false }) => {
  // 전체 세션과 현재 사용자가 선택한 세션 가져옴
  const { chatSessions, currentSessionId } = useContext(ChatContext);

  // 현재 선택된 세션 찾아서 currentSession에 저장
  const currentSession = chatSessions.find((session) => session.id === currentSessionId);
  // 선택된 세션이 없을 경우 예외 처리 (ChatTitle 나오지 않음)
  if (!currentSession) return null;
  return (
    <div className="flex gap-[10px] items-center">
      <div className="text-base text-gray/50 font-medium max-w-[250px] truncate">
        {currentSession.title}
      </div>
      {/* Header일 경우에만 수정 아이콘 표시 */}
      {isHeader === true && <img className="w-[12px] h-auto" src={IconEdit} alt="수정 아이콘" />}
    </div>
  );
};

export default ChatTitle;
