import ChatMessageList from './ChatMessageList';

const ChatSection = ({ sessionId, sessionMessages }) => {
  return (
    <div className="flex-col w-[740px] h-full">
      <div className="h-full pb-[80px] px-1 space-y-5 scrollbar-hide">
        <ChatMessageList sessionMessages={sessionMessages} sessionId={sessionId} />
        {/* <UserChat sessionMessages={sessionMessages} />
        <BotChat sessionMessages={sessionMessages} /> */}
      </div>
    </div>
  );
};

export default ChatSection;
