import Header from '../components/Header';
import ChatInputBox from '../components/ChatPage/ChatInputBox';
import SideBar from '../components/SideBar/SideBar';
import { ChatProvider } from '../contexts/ChatContextsh';
// import { useChat } from '../contexts/ChatContextsh';
// import { createChatSession } from '../utils/chat';
// import { useNavigate } from 'react-router-dom';
// import api from '../utils/api'; // 다행

const ChatMainPage = () => {
  // const navigate = useNavigate();
  // 추후에 지울 것
  // const handleTestPost = async () => {
  //   try {
  //     const session = await createChatSession();
  //     console.log('✅ 세션 생성 성공:', session); // 응답 확인!
  //   } catch (error) {
  //     console.error('❌ 세션 생성 실패:', error);
  //   }
  // };

  return (
    <ChatProvider>
      <div className="flex flex-col h-screen w-screen items-center">
        <Header />
        <SideBar />
        {/* 시작 문구 */}
        <div className="flex flex-col justify-center items-center h-full w-[760px]">
          <div className="text-[32px] mb-6 font-bold tracking-wide leading-snug text-center w-full">
            제품 반응 분석, <br />
            <span className="text-main">스포이드</span>로 추출하세요.
          </div>

          <ChatInputBox />
        </div>
      </div>
    </ChatProvider>
  );
};
export default ChatMainPage;
