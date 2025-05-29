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
    <div className="relative inline-block w-full justify-center">
      <button
        onClick={onClick}
        className="flex w-full px-[14px] py-[7px] rounded-[20px] gap-[6px] 
                  text-main font-semibold text-[14px]
                  bg-main-typeBackground hover:bg-white
                  items-center
                  border-[1px] border-main-typeStroke hover:border-[rgba(59,104,239,0.1)]
                  
                  transition duration-300"
      >
        <img className="w-[15px] items-center" src={IconSmile} alt="피부" />
        <span className="items-center justify-center">피부 타입</span>
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
