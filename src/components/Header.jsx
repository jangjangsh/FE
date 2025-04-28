import { useContext } from 'react';
import { ChatContext } from '../contexts/ChatContext';

import SidebarToggleButton from './SidebarToggleButton';
import ChatTitle from './ChatTitle';
import FilterButton from './Header/FilterButton';
import SummaryButton from './Header/SummaryButton';
import HeaderProfile from './Header/HeaderProfile';

const Header = () => {
  const { currentSessionId } = useContext(ChatContext);

  return (
    <div className="fixed top-0 left-0 w-full h-[60px] z-40 border-gray-100">
      <div className=" mx-auto flex items-center justify-between h-full">
        {/* 왼쪽 버튼 */}
        <div className="px-[20px]">
          <SidebarToggleButton />
        </div>
        {/* 조건부렌더링 */}
        <div className="flex w-full mx-auto items-center justify-between px-[42px]">
          {/* currentSessionId가 있을 때만 ChatTitle 보여줌 */}
          {currentSessionId && <ChatTitle isHeader={true} />}

          <div className="flex ml-auto gap-[16px]">
            <FilterButton />
            <SummaryButton />
          </div>
        </div>
        {/* 여기까지 */}
        <div className="ml-auto pr-[26px]">
          <HeaderProfile />
        </div>
      </div>
    </div>
  );
};
export default Header;
