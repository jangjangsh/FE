import { IconMenu } from '../utils/icons';

import { useContext } from 'react';
import { ChatContext } from '../contexts/ChatContext';

const SidebarToggleButton = () => {
  const { isSidebarOpen, setSidebarOpen } = useContext(ChatContext);

  return (
    <div onClick={() => setSidebarOpen(!isSidebarOpen)}>
      <img className="w-[24px] cursor-pointer" src={IconMenu} alt="사이드바 버튼" />
    </div>
  );
};
export default SidebarToggleButton;
