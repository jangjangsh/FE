import { ChatProvider } from '../contexts/ChatContextsh';
import Header from '../components/Header';
import SideBar from '../components/SideBar/SideBar';
import ChatSection from '../components/ChatPage/ChatSection';
import { useParams } from 'react-router-dom';
import { useChat } from '../contexts/ChatContextsh';
import ChatInputBox from '../components/ChatPage/ChatInputBox';
import api from '../utils/api'; // axios 인스턴스

const ChatDetailPage = () => {
  const {
    input,
    // setInput,
    selectedTypes,
    // setSelectedTypes,
    // isDropdownOpen,
    // setIsDropdownOpen,
    // handleSend,
    // sessionMessages,
    // setSessionMessages,
  } = useChat();

  const { sessionId } = useParams(); // ✅ 여기서 현재 세션 ID 받아옴

  const handleSendMessage = async () => {
    const body = {
      message: input,
      skinTypes:
        selectedTypes.length > 0 ? selectedTypes : ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
    };

    try {
      const response = await api.post(`/api/chat/${sessionId}/messages`, body);
      console.log('✅ AI 응답:', response.data); // BOT 답변 배열
    } catch (error) {
      console.error('❌ 메시지 전송 실패', error);
    }
  };

  return (
    <>
      <Header />
      {/* 헤더: 고정 높이 */}
      {/* 본문 영역: Header 제외하고 나머지 전체 사용 */}
      <div className="relative h-screen flex-1">
        {/* 채팅 메시지 영역 */}
        <div className="flex justify-center h-full overflow-y-auto py-[60px]">
          <div className="w-[760px] ">
            <ChatSection handleSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
      <SideBar />
    </>
  );
};
export default ChatDetailPage;
