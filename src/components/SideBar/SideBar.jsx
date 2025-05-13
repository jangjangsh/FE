import SidebarToggleButton from '../SidebarToggleButton';
import NewChatButton from './NewChatButton';
import SearchChatTitle from './SearchChatTitle';
import ChatList from './ChatList';
import { useContext, useEffect, useRef, useState } from 'react';
import { ChatContext } from '../../contexts/ChatContext';

const SideBar = () => {
  const { isSidebarOpen, setSidebarOpen, currentSessionId, chatSessions } = useContext(ChatContext);
  const sidebarRef = useRef(null);

  const [search, setSearch] = useState(''); // 검색어 상태 추가

  // 검색필터함수
  const normalize = (text) => text.replace(/\s+/g, '').toLowerCase();

  const filteredSessions = chatSessions.filter((session) =>
    normalize(session.title).includes(normalize(search))
  );

  // 외부 혹은 사이드바 아이콘 클릭 시 사이드바 여닫음
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-stroke04 z-40
          transition-opacity duration-300 ease-in-out"
          onClick={() => setSidebarOpen(false)} // 클릭 시 사이드바 닫기
        />
      )}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 h-full w-[261px]
         bg-white border-r border-gray/10 px-[20px]
         transition-all duration-500 ease-in-out transform -translate-x-full
         overflow-y-auto chat-scrollbar-custom overflow-x-hidden
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="w-[220px]">
          {/* 메뉴 */}
          {/* 왼쪽 버튼 */}
          <div className="flex items-center h-[60px] mb-[10px]">
            <SidebarToggleButton />
          </div>

          {/* 새채팅 */}
          <NewChatButton />
          {/* 채팅제목 검색 */}
          <SearchChatTitle search={search} setSearch={setSearch} />

          {/* 채팅리스트 (그룹제목, 채팅제목리스트) */}
          <ChatList sessions={filteredSessions} search={search} key={currentSessionId} />
        </div>
      </div>
    </>
  );
};
export default SideBar;
