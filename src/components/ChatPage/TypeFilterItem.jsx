import { IconCancel } from '../../utils/icons';

const TypeFilterItem = ({ type }) => {
  return (
    <>
      <div
        className="flex w-fit px-[14px] py-[6px] rounded-[10px] gap-[10px]
      justify-center items-center
      font-normal text-[14px]
      text-gray-stroke60 hover:text-gray-stroke70
      bg-gray-stroke03 hover:bg-gray-stroke05
      transition duration-300"
        style={{ textShadow: '0 0 1px rgb(255,255,255)' }}
      >
        <span>{type}</span>
        <img className="w-[8px] cursor-pointer" src={IconCancel} alt="삭제" />
      </div>
    </>
  );
};
export default TypeFilterItem;
