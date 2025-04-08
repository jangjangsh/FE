import { IconFilterBlack } from '../../utils/icons';

const FilterButton = () => {
  return (
    <div className="flex gap-[10px]">
      <img className="w-[12px] h-auto" src={IconFilterBlack} alt="filter 아이콘" />
      <div>필터</div>
    </div>
  );
};
export default FilterButton;
