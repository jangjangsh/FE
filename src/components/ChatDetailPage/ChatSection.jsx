// 전체 채팅 영역 (유저, 챗봇 채팅)
import ChatInputBox from './ChatInputBox';
import TypeSelectorBox from './TypeSelectorBox';

const ChatSection = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[760px]">
      <div className="text-3xl font-bold tracking-wide leading-snug text-center w-full">
        제품 반응 분석, <br />
        <span className="text-main">스포이드</span>로 추출하세요.
      </div>
      {/* 채팅 입력 컨테이너 */}
      <ChatInputBox />
    </div>
  );
};

export default ChatSection;
