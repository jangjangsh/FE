import { useEffect, useRef } from 'react';
import BotChat from './BotChat';
import UserChat from './UserChat';
import BotChatContainer from './BotChatContainer';

const ChatMessageList = ({ sessionMessages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessionMessages]);

  return (
    <div className="flex flex-col">
      {sessionMessages.map((item, idx) => {
        return item.sender === 'USER' ? (
          <>
            <div>
              <UserChat key={idx} message={item.message} />
            </div>
            <div className="border-t border-gray-stroke05"></div>
            <div className="my-6">
              <BotChatContainer
                sessionMessages={sessionMessages}
                key={idx}
                message={item.message}
              />
              {/* 확인용 코드 추후 삭제 예정 */}
            </div>
          </>
        ) : (
          <div>
            <BotChat sessionMessages={sessionMessages} key={idx} message={item.message} />
            {/* 확인용 코드 추후 삭제 예정 */}
          </div>
        );
      })}
      {/* ⬇️ 맨 아래 요소 */}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessageList;
