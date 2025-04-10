// import { useRef, useEffect } from 'react';
import { IconCheckNoBgInactive } from '../../utils/icons';
import { IconCheckNoBgActive } from '../../utils/icons';
// 드롭다운 목록 (건성, 지성 등)
const TypeDropDown = () => {
  return (
    <div>
      <ul
        className="
         bg-white w-full
        border border-gray-stroke03
        rounded-[10px]
      
        shadow-[0_0_10px_rgba(0,0,0,0.05)]
        p-[4px] z-10"
      >
        <li
          className="
        flex gap-[10px] px-[10px] py-[5px] text-[14px] 
        text-gray-stroke30 hover:text-gray-stroke70 font-normal
        text-gray-800
         hover:bg-gray-stroke02 rounded-md 
         transition duration-300
         cursor-pointer"
        >
          <img className="w-[12px]" src={IconCheckNoBgInactive} alt="" />
          건성
        </li>
        <li
          className="
        flex gap-[10px] px-[10px] py-[5px] text-[14px] 
        text-gray-stroke30 hover:text-gray-stroke70 font-normal
        text-gray-800
         hover:bg-gray-stroke02 rounded-md 
         transition duration-300
         cursor-pointer"
        >
          <img className="w-[12px]" src={IconCheckNoBgInactive} alt="" />
          지성
        </li>
        <li
          className="
        flex gap-[10px] px-[10px] py-[5px] text-[14px] 
        text-gray-stroke30 hover:text-gray-stroke70 font-normal
        text-gray-800
         hover:bg-gray-stroke02 rounded-md
         transition duration-300
         cursor-pointer"
        >
          <img className="w-[12px]" src={IconCheckNoBgInactive} alt="" />
          민감성
        </li>
        <li
          className="
        flex gap-[10px] px-[10px] py-[5px] text-[14px] 
        text-gray-stroke30 hover:text-gray-stroke70 font-normal
        text-gray-800
         hover:bg-gray-stroke02 rounded-md 
         transition duration-300
         cursor-pointer"
        >
          <img
            className="w-[12px] hover:text-gray-stroke70 font-normal transition duration-300"
            src={IconCheckNoBgInactive}
            alt=""
          />
          복합성
        </li>

        {/* ...나머지도 같은 형식 */}
      </ul>
    </div>
  );
};

export default TypeDropDown;
