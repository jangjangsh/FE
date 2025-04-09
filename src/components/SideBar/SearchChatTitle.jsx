import { IconSearch } from '../../utils/icons';

const SearchChatTitle = () => {
  return (
    <div
      className="flex w-[220px] h-[38px] px-[10px] py-[8px] 
    rounded-[15px] gap-[12.2px]
    hover:bg-gray-stroke03"
    >
      <img className="w-[20px] h-[20px]" src={IconSearch} alt="검색아이콘" />
      <div className="text-gray-stroke30 font-medium">채팅 제목 검색</div>
    </div>
  );
};
export default SearchChatTitle;
