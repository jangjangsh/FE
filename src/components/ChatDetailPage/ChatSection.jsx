// 전체 채팅 영역 (유저, 챗봇 채팅)
import ChatInputBox from './ChatInputBox';

const ChatSection = () => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center w-[760px]">
      <div className="text-3xl font-bold tracking-wide leading-snug text-center">
        제품 반응 분석, <br />
        <span className="text-main">스포이드</span>로 추출하세요.
      </div>
      <ChatInputBox />
    </div>
  );
};

export default ChatSection;
