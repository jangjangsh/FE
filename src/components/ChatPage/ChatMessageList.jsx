import { useRef, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import BotChatContainer from './BotChatContainer';
import UserChat from './UserChat';

const ChatMessageList = ({ currentSessionId, allChatMessages }) => {
  const lastBotRef = useRef(null);
  const seenMessage = new Set();
  const { liveBotMessage } = useChat();

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
    if (liveBotMessage) {
      rendered.push(
        <div className="my-6" key="live-bot-message">
          <div className="flex justify-start">
            <div className="bg-white border border-main-typeStroke font-normal text-gray-stroke70 px-[18px] py-[16px] rounded-b-[15px] w-fit max-w-[100%] whitespace-pre-line break-words">
              {liveBotMessage}
            </div>
          </div>
        </div>
      );
    }

    return rendered;
  };

  return <div className="flex flex-col w-full">{renderMessages()}</div>;
};

export default ChatMessageList;
