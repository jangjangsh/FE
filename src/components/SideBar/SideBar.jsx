import SidebarToggleButton from '.././Header/SidebarToggleButton';
import NewChatButton from './NewChatButton';
import SearchChatTitle from './SearchChatTitle';

const SideBar = () => {
  return (
    <>
      <div className="fixed top-0 left-0 z-50 h-screen w-[260px] bg-white border-r border-gray/10">
        {/* 메뉴 */}
        <div className="px-[10px] py-5 border-b border-gray/20">
          {/* 왼쪽 버튼 */}
          <div className="px-[20px]">
            <SidebarToggleButton />
          </div>
        </div>

        {/* 새채팅 */}
        <NewChatButton />
        <SearchChatTitle />

        {/* <!-- Navigation Menu --> */}
        <nav className="px-[20px] pt-[12px] gap-[20px]">
          {/* <!-- Main Navigation --> */}
          <div className="px-[10px] pt-[12px]">
            <div className="pt-[12px]">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Navigation
              </p>
            </div>
            <div className="space-y-1">
              <a
                href="#"
                className="block px-[10px] py-2 text-sm font-medium text-black dark:text-white hover:bg-gray-100 hover:text-indigo-500 "
              >
                Overview
              </a>
              <a
                href="#"
                className="block px-[10px] py-2 text-sm font-medium text-black dark:text-white hover:bg-gray-100hover:text-indigo-500 "
              >
                Projects
              </a>
              <a
                href="#"
                className="block px-[10px] py-2 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-500 dark:hover:text-indigo-400"
              >
                Tasks
              </a>
            </div>
          </div>

          {/* <!-- Team Section --> */}
          <div className="px-[10px] pt-[12px]">
            <div className="pt-[12px]">
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Navigation
              </p>
            </div>
            <div className="space-y-1">
              <a
                href="#"
                className="block px-[10px] py-2 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-500 dark:hover:text-indigo-400"
              >
                Overview
              </a>
              <a
                href="#"
                className="block px-[10px] py-2 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-500 dark:hover:text-indigo-400"
              >
                Projects
              </a>
              <a
                href="#"
                className="block px-[10px] py-2 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-500 dark:hover:text-indigo-400"
              >
                Tasks
              </a>
            </div>
          </div>

          {/* <!-- Settings Section --> */}
          <div className="px-[10px] pt-[12px]">
            <div className="pt-[12px]">
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Navigation
              </p>
            </div>
            <div className="space-y-1">
              <a
                href="#"
                className="block px-[10px] py-2 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-500 dark:hover:text-indigo-400"
              >
                Overview
              </a>
              <a
                href="#"
                className="block px-[10px] py-2 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-500 dark:hover:text-indigo-400"
              >
                Projects
              </a>
              <a
                href="#"
                className="block px-[10px] py-2 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-500 dark:hover:text-indigo-400"
              >
                Tasks
              </a>
            </div>
          </div>
        </nav>

        {/* 사용자 정보 */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700">
          <div className="px-[10px] py-3">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500">Signed in as</p>
            <p className="mt-1 text-sm font-medium text-black dark:text-white">john@example.com</p>
            <button className="mt-2 w-full text-left text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SideBar;
