import { IconEdit } from '../utils/icons';
const ChatTitle = () => {
  return (
    <div className="flex gap-[10px]">
      {/* header 기준 css */}
      <div className="text-base text-gray/50 font-medium max-w-[250px]">제목을 입력해 주세요.</div>
      {/* 조건부 */}
      <img className="w-[12px] h-auto" src={IconEdit} alt="수정 아이콘" />
    </div>
  );
};
export default ChatTitle;
