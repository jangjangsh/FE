import { IconCancelRed } from '../../utils/icons';

const SessionDeleteBtn = ({ onClick }) => {
  return (
    <div className="absolute p-1 w-fit right-0 top-full z-[999] rounded-[10px] border border-gray-stroke03 bg-white shadow-dropDown">
      <button
        onClick={onClick} // ✅ 여기 수정
        className="flex items-center w-fit px-2 py-1.5 justify-center hover:bg-gray-stroke02 rounded-[6px] duration-200"
      >
        <div className="w-4 mx-[4px]">
          <img className="w-[16px]" src={IconCancelRed} alt="Delete Session Icon" />
        </div>
        <span className="text-[14px] px-[4px] whitespace-nowrap inline text-rederror">
          채팅 삭제
        </span>
      </button>
    </div>
  );
};

export default SessionDeleteBtn;
