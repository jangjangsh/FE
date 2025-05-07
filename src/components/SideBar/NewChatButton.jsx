import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../contexts/ChatContext';
import { IconPlus } from '../../utils/icons';

const NewChatButton = () => {
  const { createChatSession, setCurrentSessionId, setSidebarOpen } = useContext(ChatContext);
  const nav = useNavigate();

  const handleNewChat = async () => {
    const newSessionId = await createChatSession(); // 여기서 sessionId만 받아옴
    if (!newSessionId) {
      console.error('세션 생성 실패: sessionId 없음');
      return;
    }
    setCurrentSessionId(newSessionId);
    setSidebarOpen(false);
    nav(`/chat/${newSessionId}`);
  };

  return (
    <div
      className="flex w-full h-[38px] px-[10px] py-[8px]
        rounded-[15px] gap-[12px] text-main
        hover:bg-main-newChatHover cursor-pointer"
      onClick={handleNewChat}
    >
      <img className="w-[20px] h-[20px]" src={IconPlus} alt="채팅추가버튼" />
      <div className="font-bold">새 채팅</div>
    </div>
  );
};

export default NewChatButton;
