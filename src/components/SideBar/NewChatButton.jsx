import { IconPlus } from '../../utils/icons';

const NewChatButton = () => {
  return (
    <div
      className="flex w-[220px] h-[38px] px-[10px] py-[8px] 
    rounded-[15px] gap-[12px] text-main
    hover:bg-main-newChatHover "
    >
      <img className="w-[20px] h-[20px]" src={IconPlus} alt="채팅추가버튼" />
      <div className="font-bold">새 채팅</div>
    </div>
  );
};
export default NewChatButton;
