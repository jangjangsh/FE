import { IconCancel } from '../../utils/icons';

const TypeFilterItem = ({ label, type, onDelete }) => {
  console.log(type);
  return (
    <>
      <div
        className="flex w-fit px-[15px] py-[2px] rounded-[20px] gap-[10px]
      justify-center items-center
      font-normal text-[14px]
      text-gray-stroke50 hover:text-gray-stroke70
      bg-gray-stroke02 hover:bg-gray-stroke05
      border border-gray-stroke04
      transition duration-300"
        style={{ textShadow: '0 0 1px rgb(255,255,255)' }}
      >
        <span className="">{label}</span>
        <img
          className="w-[8px] cursor-pointer"
          src={IconCancel}
          alt="삭제"
          onClick={() => onDelete(type)}
        />
      </div>
    </>
  );
};
export default TypeFilterItem;
