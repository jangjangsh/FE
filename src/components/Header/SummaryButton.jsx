import { IconSummaryBlack } from '../../utils/icons';

const SummaryButton = () => {
  return (
    <div className="flex gap-[10px]">
      <img className="w-[12px] h-auto" src={IconSummaryBlack} alt="filter 아이콘" />
      <div>요약</div>
    </div>
  );
};
export default SummaryButton;
