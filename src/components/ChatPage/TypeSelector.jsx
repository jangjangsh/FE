import { IconSmile } from '../../utils/icons';
import TypeDropDown from './TypeDropdown';

const TypeSelector = ({
  onClick,
  isDropdownOpen,
  selectedTypes,
  setSelectedTypes,
  dropdownPositionClass,
}) => {
  return (
    <div className="relative inline-block w-full">
      <button
        onClick={onClick}
        className="flex w-full px-[12px] py-[6px] rounded-[10px] gap-[6px] 
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
        <div className={`absolute ${dropdownPositionClass} left-0 w-full z-10`}>
          <TypeDropDown selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
        </div>
      )}
    </div>
  );
};

export default TypeSelector;
