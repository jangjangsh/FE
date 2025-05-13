import { ChatContext } from '../../contexts/ChatContext';
import ChatGroup from './ChatGroup';
import ChatTitleItem from './ChatTitleItem';
import { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ChatList = ({ sessions, search }) => {
  const { currentSessionId } = useContext(ChatContext);

  const bookmarks = sessions.filter((s) => s.isBookmark);
  const normalChats = sessions.filter((s) => !s.isBookmark);

  return (
    <div className="flex flex-col w-full pt-[12px] gap-[24px]">
      {/* 즐겨찾기 그룹 */}
      {bookmarks.length > 0 && (
        <ChatGroup title="즐겨찾기">
          <AnimatePresence>
            {bookmarks.map((session) => (
              <motion.div
                key={session.sessionId}
                layout
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChatTitleItem
                  session={session}
                  isSelected={session.sessionId === currentSessionId}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </ChatGroup>
      )}

      {/* 내 채팅 그룹 */}
      <ChatGroup title="내 채팅">
        <AnimatePresence>
          {normalChats.length === 0 && search !== '' ? (
            <motion.div
              key="no-result"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-gray-stroke30 text-center py-2 text-[15px] font-normal">
                검색 결과가 없습니다.
              </div>
            </motion.div>
          ) : (
            normalChats.map((session) => (
              <motion.div
                key={session.sessionId}
                layout
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChatTitleItem
                  session={session}
                  isSelected={session.sessionId === currentSessionId}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </ChatGroup>
    </div>
  );
};

export default ChatList;
