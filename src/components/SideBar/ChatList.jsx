import { ChatContext } from '../../contexts/ChatContext';
import ChatGroup from './ChatGroup';
import ChatTitleItem from './ChatTitleItem';

import { useContext } from 'react';

const ChatList = ({ sessions, search }) => {
  const { currentSessionId } = useContext(ChatContext);

  return (
    <div>
      <div className="w-full pt-[12px]">
        <ChatGroup className=" gap-[10px]" title="내 채팅">
          {sessions.length === 0 && search !== '' && (
            <div className="text-gray-stroke30 text-center py-2 text-[15px] font-normal">
              검색 결과가 없습니다.
            </div>
          )}
          {sessions.map((session) => (
            <ChatTitleItem
              key={session.sessionId}
              session={session}
              isSelected={session.sessionId === currentSessionId}
            />
          ))}
        </ChatGroup>
      </div>
    </div>
  );
};
export default ChatList;
