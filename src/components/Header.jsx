import { ChatContext } from '../contexts/ChatContext';
import { useLocation } from 'react-router-dom';
import { IconLogo } from '../utils/icons';
import { Logo } from '../utils/icons';
import { useAuth } from '../contexts/AuthContext';

import SidebarToggleButton from './SidebarToggleButton';
import ChatTitle from '../components/Header/ChatTitle';
import FilterButton from './Header/FilterButton';
import SummaryButton from './Header/SummaryButton';
import HeaderProfile from './Header/HeaderProfile';
import HeaderLoginButton from './Header/HeaderLoginButton';
import { div } from 'framer-motion/client';

const Header = ({ onClick }) => {
  const location = useLocation();
  const isChatPage = location.pathname.startsWith('/chat');
  const isLoginPage = location.pathname.startsWith('/login');
  const isIndexPage = location.pathname === '/';

  // 추후에 로그인 정보 저장할 것
  const { isLoggedIn } = useAuth(); // ✅ 로그인 여부 확인
  console.log(isLoggedIn);

  return (
    <div className="fixed top-0 left-0 w-full h-[64px] px-6 bg-white z-40">
      <div className=" flex items-center justify-between h-full w-full">
        {/* 왼쪽 버튼 */}
        <div className="">
          {isChatPage && <SidebarToggleButton />}
          {isLoginPage && <img className="w-10" src={IconLogo} alt="" />}
          {isIndexPage && (
            <div className="flex gap-1">
              <img className="w-[39px]" src={IconLogo} alt="" />
              <img className="w-[95%]" src={Logo} alt="" />
            </div>
          )}
        </div>
        {/* 조건부렌더링 */}
        <div className="flex w-full mx-auto items-center justify-between pl-[36px]">
          {/* Chat페이지에서만 ChatTitle 보여줌 */}
          {isChatPage && <ChatTitle isHeader={true} />}

          <div className="flex ml-auto gap-[16px]">
            {/* <FilterButton /> */}
            {isChatPage && <SummaryButton isHeader={true} onClick={onClick} />}
            {!isLoginPage &&
              (isLoggedIn ? (
                <HeaderProfile isHeader={true} />
              ) : (
                <HeaderLoginButton isHeader={true} />
              ))}
          </div>
        </div>
        {/* 여기까지 */}

        <div className="ml-auto">{/* <HeaderProfile /> */}</div>
      </div>
    </div>
  );
};
export default Header;
