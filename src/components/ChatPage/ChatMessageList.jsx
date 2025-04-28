import { useRef, useEffect } from 'react';
import BotChatContainer from './BotChatContainer';
import UserChat from './UserChat';

const ChatMessageList = ({ allChatMessages }) => {
  const bottomRef = useRef(null);
  const seenMessages = new Set();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allChatMessages]);

  const renderMessages = () => {
    const rendered = [];
    let i = 0;

    while (i < allChatMessages.length) {
      const msg = allChatMessages[i];

      if (msg.sender === 'USER') {
        // 1. User 메세지 렌더
        if (!seenMessages.has(msg.message)) {
          rendered.push(
            <div key={`user-${i}`}>
              <UserChat message={msg.message} />
            </div>
          );
          seenMessages.add(msg.message);
        }

        // 2. 이어지는 Bot 메세지들 모아주기
        const botMessages = [];
        let j = i + 1;
        while (j < allChatMessages.length && allChatMessages[j].sender === 'BOT') {
          botMessages.push(allChatMessages[j]);
          j++;
        }

        // 3. Bot 답변이 있다면, BotChatContainer로 넘기기
        if (botMessages.length > 0) {
          rendered.push(
            <div key={`bot-${i}`} className="my-6">
              <BotChatContainer botMessages={botMessages} />
            </div>
          );
        }

        // 4. i를 j로 업데이트 (봇 메세지까지 건너뛰기)
        i = j;
      } else {
        // 만약 BOT부터 시작했으면 (이상한 케이스) 그냥 건너뜀
        i++;
      }
    }

    return rendered;
  };

  return (
    <div className="flex flex-col w-full">
      {renderMessages()}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessageList;
