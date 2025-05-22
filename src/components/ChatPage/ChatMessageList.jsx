import { useRef, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import BotChatContainer from './BotChatContainer';
import UserChat from './UserChat';

const ChatMessageList = ({ currentSessionId }) => {
  const lastUserRef = useRef(null);
  const lastBotRef = useRef(null);
  const { sessionMessages } = useChat();

  useEffect(() => {
    const last = sessionMessages[sessionMessages.length - 1];
    if (!last) return;

    if (last.sender === 'USER' && lastUserRef.current) {
      lastUserRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (last.sender === 'BOT' && lastBotRef.current) {
      lastBotRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [sessionMessages]);

  const handleBotAnswerComplete = () => {
    if (lastBotRef.current) {
      lastBotRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderMessages = () => {
    const rendered = [];
    let i = 0;
    const seenMessages = new Set(); // ✅ 중복 메시지 필터용

    while (i < sessionMessages.length) {
      const msg = sessionMessages[i];

      if (msg.sender === 'USER') {
        // ✅ 같은 내용의 메시지를 한 번만 렌더링
        if (!seenMessages.has(msg.message)) {
          seenMessages.add(msg.message);

          rendered.push(
            <div key={`user-${msg.id}`} ref={lastUserRef}>
              <UserChat message={msg.message} />
            </div>
          );
        }

        // 이어지는 BOT 메시지 묶기
        const botMessages = [];
        let j = i + 1;
        while (j < sessionMessages.length && sessionMessages[j].sender === 'BOT') {
          botMessages.push(sessionMessages[j]);
          j++;
        }

        if (botMessages.length > 0) {
          rendered.push(
            <div
              key={`bot-${i}`}
              ref={j - 1 === sessionMessages.length - 1 ? lastBotRef : null}
              className="my-6"
            >
              <BotChatContainer
                botMessages={botMessages}
                blockId={`bot-${currentSessionId}-${i}`}
                onAnswerComplete={handleBotAnswerComplete}
              />
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
