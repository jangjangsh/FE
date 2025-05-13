import { IconSummaryBlack } from '../../utils/icons';
// import { useState } from 'react';
import SessionSummary from './SessionSummary';

const SummaryButton = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="flex px-4 py-2 gap-[10px] items-center border border-gray-stroke05 rounded-[10px] text-[14px] font-medium
    hover:border-gray-stroke10 hover:shadow-custom
    transition-all duration-200 cursor-pointer"
      >
        <img className="w-[12px] h-auto" src={IconSummaryBlack} alt="filter 아이콘" />
        <div>요약</div>
      </button>
    </div>
  );
};
export default SummaryButton;
