// 전체 채팅 영역 (유저, 챗봇 채팅)
import ChatInputBox from './ChatInputBox';
import Header from '../Header';

const ChatSection = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center">
      <Header />
      <div className="flex flex-col justify-center items-center w-[760px]">
        {/* 채팅 입력 컨테이너 */}
        <ChatInputBox />
      </div>
    </div>
  );
};

export default ChatSection;
