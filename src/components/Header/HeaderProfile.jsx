import { useState, useRef, useEffect } from 'react';
import { IconAccount } from '../../utils/icons';
import { IconLogout } from '../../utils/icons';
import DropDownItem from '../DropDownItem';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [accountClick, setAccountClick] = useState(false);
  const { logout } = useAuth();
  const nav = useNavigate();
  const dropdownRef = useRef(null);

  const isClick = () => {
    setAccountClick(!accountClick);
  };

  // ✅ 바깥 클릭 감지용 useEffect
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAccountClick(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    nav(`/`);
  };

  return (
    <div className="relative flex" ref={dropdownRef}>
      <div
        onClick={isClick}
        className="w-10 opacity-20 hover:opacity-30 duration-300 cursor-pointer"
      >
        <img src={IconAccount} alt="profile" />
      </div>

      <div className="absolute p-[5px] w-fit right-0 top-full mt-2 z-50 rounded-[10px] border border-gray-stroke03 shadow-dropDown">
        {accountClick && (
          <DropDownItem
            icon={IconLogout}
            label="로그아웃"
            onClick={handleLogout}
            textColor={'text-rederror'}
          />
        )}
      </div>
    </div>
  );
};
export default Profile;
