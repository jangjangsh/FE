import { useRef, useEffect } from 'react';
import BotChat from './BotChat';
import UserChat from './UserChat';

// import BotChatContainer from './BotChatContainer';

const ChatMessageList = ({ allChatMessages }) => {
  const bottomRef = useRef(null);

  // 스크롤 내리기
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allChatMessages]);

  return (
    <div className="flex flex-col w-full">
      {allChatMessages.map((item, idx) => {
        return item.sender !== 'BOT' ? (
          <>
            {/* 만약 보낸 사람이 BOT이 아니면 */}
            <div>
              <UserChat key={idx} message={item.message} />
            </div>
            <div className="border-t border-gray-stroke05"></div>
          </>
        ) : (
          <div className="my-6">
            <BotChat key={idx} message={item.message} />
            {/* <BotChatContainer
              sessionMessages={sessionMessages}
              key={idx}
              message={item.message}
              sessionId={sessionId}
            /> */}
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
