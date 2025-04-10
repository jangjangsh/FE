import { IconSmile } from '../../utils/icons';
import TypeDropDown from './TypeDropdown';

const TypeSelector = ({ onClick, isDropdownOpen }) => {
  return (
    <div className="relative inline-block w-full">
      <button
        onClick={onClick}
        className="flex w-full px-[10px] py-[6px] rounded-[10px] gap-[6px]
                  text-main font-medium text-[14px]
                  bg-main-typeBackground hover:bg-white
                  border border-main-typeStroke hover:border-[rgba(59,104,239,0.2)]
                  focus:border-[rgba(59,104,239,0.2)] focus:bg-white
                  transition duration-300"
      >
        <img className="w-[16px]" src={IconSmile} alt="피부" />
        피부 타입
      </button>
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-full z-10">
          <TypeDropDown />
        </div>
      )}
    </div>
  );
};

export default TypeSelector;
