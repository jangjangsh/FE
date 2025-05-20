import BotChatContainer from './BotChatContainer';
// 챗봇 답변 // 테스트용 응답 (백엔드 응답이 여기에 들어왔다고 가정)

// const BotChat = ({ sessionMessages }) => {
const BotChat = ({ message }) => {
  return (
    <section className="">
      <div className="flex justify-start">
        <div className="bg-white border-t-0 border-[1px] border-main-typeStroke font-normal text-gray-stroke70 pl-[18px] pr-[16px] py-[16px] rounded-b-[15px] w-fit max-w-[100%] whitespace-pre-line break-words">
          {message}
        </div>
      </div>
    </section>
  );
};

export default BotChat;
