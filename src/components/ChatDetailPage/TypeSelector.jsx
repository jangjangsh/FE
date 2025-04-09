import { IconSmile } from '../../utils/icons';

// 피부 타입 선택 버튼
const TypeSelector = () => {
  return (
    <>
      <button
        className="
        flex
        px-[10px] py-[6px] rounded-[10px] gap-[6px]
        text-main font-medium text-[14px]
        bg-main-typeBackground
        border border-main-typeStroke"
      >
        <img
          className="
      w-[16px]
      "
          src={IconSmile}
          alt="피부"
        />
        피부 타입
      </button>
    </>
  );
};

export default TypeSelector;
