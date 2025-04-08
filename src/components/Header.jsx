import SidebarToggleButton from './Header/SidebarToggleButton';
import ChatTitle from './ChatTitle';
import FilterButton from './Header/FilterButton';
import SummaryButton from './Header/SummaryButton';
import HeaderProfile from './Header/HeaderProfile';

const Header = () => {
  return (
    <div className="w-full h-[60px] max-w-[1440px] mx-auto bg-white flex items-center border-gray/5 border-b py-[14px]">
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
  );
};
export default Header;
