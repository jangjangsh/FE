import { IconMenu } from '../utils/icons';

import { useContext } from 'react';
import { ChatContext } from '../contexts/ChatContext';

const SidebarToggleButton = () => {
  const { isSidebarOpen, setSidebarOpen } = useContext(ChatContext);
  console.log('토글버튼 클릭됨:', isSidebarOpen); // ✅ 확인용 콘솔
  return (
    <div onClick={() => setSidebarOpen(!isSidebarOpen)}>
      <img className="w-[21px] h-[14px]" src={IconMenu} alt="사이드바 버튼" />
    </div>
  );
};
export default SidebarToggleButton;
