import SidebarToggleButton from './Header/SidebarToggleButton';
import ChatTitle from './ChatTitle';
import FilterButton from './Header/FilterButton';
import SummaryButton from './Header/SummaryButton';
import HeaderProfile from './Header/HeaderProfile';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-[60px] bg-white z-50 border-b border-gray-900/5">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between h-full px-[20px]">
        {/* 왼쪽 버튼 */}
        <div className="px-[20px]">
          <SidebarToggleButton />
        </div>
        {/* 조건부렌더링 */}
        <div className="flex w-full mx-auto items-center justify-between px-[42px]">
          <ChatTitle />
          {/* <div className="flex ml-auto gap-[16px]">
          <FilterButton />
          <SummaryButton />
        </div> */}
        </div>
        {/* 여기까지 */}
        {/* <div className="ml-auto pr-[26px]">
        <HeaderProfile />
      </div> */}
      </div>
    </div>
  );
};
export default Header;
