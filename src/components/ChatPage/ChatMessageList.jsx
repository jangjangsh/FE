import { useRef, useEffect } from 'react';
import BotChatContainer from './BotChatContainer';
import UserChat from './UserChat';

const ChatMessageList = ({ currentSessionId, allChatMessages }) => {
  const lastBotRef = useRef(null);
  const seenMessage = new Set();

  useEffect(() => {
    if (lastBotRef.current) {
      lastBotRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [allChatMessages]);

  const handleBotAnswerComplete = () => {
    if (lastBotRef.current) {
      lastBotRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderMessages = () => {
    const rendered = [];
    let i = 0;
    let lastBotIndex = -1;

    while (i < allChatMessages.length) {
      const msg = allChatMessages[i];

      if (msg.sender === 'USER') {
        if (!seenMessage.has(msg.message)) {
          seenMessage.add(msg.message);
          rendered.push(
            <div key={`user-${i}`}>
              <UserChat message={msg.message} />
            </div>
          );
        }

        const botMessages = [];
        let j = i + 1;
        while (j < allChatMessages.length && allChatMessages[j].sender === 'BOT') {
          botMessages.push(allChatMessages[j]);
          j++;
        }

        if (botMessages.length > 0) {
          lastBotIndex = i;

          rendered.push(
            <div key={`bot-${i}`} ref={i === lastBotIndex ? lastBotRef : null} className="my-6">
              <BotChatContainer
                botMessages={botMessages}
                onAnswerComplete={handleBotAnswerComplete}
                blockId={`bot-${currentSessionId}-${i}`} // 👈 이렇게 유일하게 만들어서 넘겨야 함
              />
            </div>
          );

          seenMessage.clear();
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
