import { useRef, useEffect } from 'react';
import BotChatContainer from './BotChatContainer';
import UserChat from './UserChat';

const ChatMessageList = ({ allChatMessages }) => {
  const lastBotRef = useRef(null);

  useEffect(() => {
    if (lastBotRef.current) {
      lastBotRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [allChatMessages]);

  const renderMessages = () => {
    const rendered = [];
    let i = 0;
    let lastBotIndex = -1;

    while (i < allChatMessages.length) {
      const msg = allChatMessages[i];

      if (msg.sender === 'USER') {
        rendered.push(
          <div key={`user-${i}`}>
            <UserChat message={msg.message} />
          </div>
        );

        const botMessages = [];
        let j = i + 1;
        while (j < allChatMessages.length && allChatMessages[j].sender === 'BOT') {
          botMessages.push(allChatMessages[j]);
          j++;
        }

        if (botMessages.length > 0) {
          lastBotIndex = i;

          rendered.push(
            <div
              key={`bot-${i}`}
              ref={i === lastBotIndex ? lastBotRef : null} // 마지막 봇 묶음에 ref 걸기
              className="my-6"
            >
              <BotChatContainer botMessages={botMessages} />
            </div>
          );
        }

        i = j;
      } else {
        i++;
      }
    }

    return rendered;
  };

  return <div className="flex flex-col w-full">{renderMessages()}</div>;
};

export default ChatMessageList;
