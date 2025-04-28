import ChatInputBox from './ChatInputBox';
import UserChat from './UserChat';
import BotChat from './BotChat';
import ChatMessageList from './ChatMessageList';

const ChatSection = ({ sessionId, allChatMessages }) => {
  return (
    <div className="flex-col w-[740px] h-full bg-white">
      <div className="h-full pb-[80px] px-1 space-y-5 scrollbar-hide">
        <ChatMessageList allChatMessages={allChatMessages} sessionId={sessionId} />
        {/* <UserChat sessionMessages={sessionMessages} />
        <BotChat sessionMessages={sessionMessages} /> */}
      </div>
    </div>
  );
};

export default ChatSection;
