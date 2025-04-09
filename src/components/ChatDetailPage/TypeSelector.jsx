import { IconSmile } from '../../utils/icons';
import TypeDropDown from './TypeDropdown';

// 피부 타입 선택 버튼
const TypeSelector = () => {
  return (
    <>
      <button
        className="
        relative flex
        px-[10px] py-[6px] rounded-[10px] gap-[6px]
        text-main font-medium text-[14px]
        bg-main-typeBackground hover:bg-white
        border border-main-typeStroke hover:border-[rgba(59,104,239,0.2)]
        focus:border-[rgba(59,104,239,0.2)]e focus:bg-white
        transition duration-300
        "
      >
        <img className="w-[16px]" src={IconSmile} alt="피부" />
        피부 타입
        <TypeDropDown />
      </button>
    </>
  );
};

export default TypeSelector;
