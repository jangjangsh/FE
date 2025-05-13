import { IconSearch } from '../../utils/icons';

const SearchChatTitle = ({ search, setSearch }) => {
  //search state가 바뀔때마다 리랜더링됨
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div
      className={`
      flex w-[220px]] h-[38px] px-[10px] py-[8px]
      rounded-[15px] gap-[12.2px]
      ${search ? 'bg-gray-stroke03' : 'hover:bg-gray-stroke03 focus-within:bg-gray-stroke03'}
      `}
      // transition-colors duration-200
    >
      <img className="w-[20px] h-[20px]" src={IconSearch} alt="검색아이콘" />
      <input
        className="text-gray font-normal
        w-full min-w-0 bg-transparent
        border-none outline-none
        placeholder-gray-stroke30
        appearance: none
        focus:font-normal"
        value={search}
        onChange={onChangeSearch}
        placeholder="채팅 제목 검색"
      />
    </div>
  );
};
export default SearchChatTitle;
