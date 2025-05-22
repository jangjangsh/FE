import { useRef, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import BotChatContainer from './BotChatContainer';
import UserChat from './UserChat';
import { IconLogo } from '../../utils/icons';

const ChatMessageList = ({ currentSessionId }) => {
  const lastUserRef = useRef(null);
  const lastBotRef = useRef(null);
  const { sessionMessages, isLoading } = useChat(); // 👈 isLoading 추가

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
    const seenUserMessages = new Set();

    while (i < sessionMessages.length) {
      const msg = sessionMessages[i];

      if (msg.sender === 'USER') {
        const hasSeenSameMessage = seenUserMessages.has(msg.message);

        if (!hasSeenSameMessage) {
          const isLastUserMessage = (() => {
            for (let k = i + 1; k < sessionMessages.length; k++) {
              if (
                sessionMessages[k].sender === 'USER' &&
                sessionMessages[k].message === msg.message
              ) {
                return false;
              }
            }
            return true;
          })();

          if (isLastUserMessage) {
            rendered.push(
              <div key={`user-${msg.id}`} ref={lastUserRef}>
                <UserChat message={msg.message} />
              </div>
            );
            seenUserMessages.add(msg.message);
          }
        }

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

    // ✅ 로딩 중이면 마지막에 안내 문구 추가
    if (isLoading) {
      rendered.push(
        <div className="flex items-center py-4 mt-4">
          <img className="w-7" src={IconLogo} alt="" />
          <span className="ml-2 text-16 font-medium bg-gradient-to-r from-main to-main-purple bg-clip-text text-transparent overflow-hidden timer-glass opacity-50">
            SSPOID가 리뷰를 추출 중입니다...
          </span>
        </div>
      );
    }

    return rendered;
  };

  return <div className="flex flex-col w-full">{renderMessages()}</div>;
};

export default ChatMessageList;
