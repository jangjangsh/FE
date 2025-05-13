import { IconLogout } from '../../utils/icons';

const UserDropDownMenu = () => {
  return (
    <div className="absolute p-1 w-fit right-0 top-full mt-1 z-50 rounded-[10px] border border-gray-stroke03 shadow-dropDown">
      <button className="flex items-center w-fit px-2 py-1.5 justify-center hover:bg-gray-stroke02 rounded-[6px] duration-200">
        <div className="w-4 mx-[4px]">
          <img src={IconLogout} alt="" />
        </div>
        <span className="text-[14px] px-[4px] whitespace-nowrap inline text-rederror">
          로그아웃
        </span>
      </button>
    </div>
  );
};

export default UserDropDownMenu;
