// import { useRef, useEffect } from 'react';

import { useEffect } from 'react';
import { useChat } from '../../contexts/ChatContextsh';
import { IconCheckNoBgInactive } from '../../utils/icons';
import { IconCheckNoBgActive } from '../../utils/icons';
// 드롭다운 목록 (건성, 지성 등)
const TypeDropDown = ({ selectedTypes, setSelectedTypes }) => {
  const { skinTypes } = useChat();
  const onClickTypes = (type) => {
    setSelectedTypes(
      (prev) =>
        // prev: 지금까지 선택된 타입들의 배열
        prev.includes(type)
          ? prev.filter((item) => item !== type) // item: prev 배열 안에 있는 각각의 타입을 하나하나 비교해서, 눌린 type이랑 같은 건 빼버림
          : [...prev, type] // type: 이번에 새로 클릭한 타입, prev 배열에 추가함
    );
  };

  useEffect(() => {
    console.log('✅ 현재 skinTypes:', skinTypes);
  }, [skinTypes]); // 🔥 skinTypes가 변할 때마다 실행

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
          onClick={() => onClickTypes('DRY')}
          className={`
          flex gap-[10px] px-[14px] py-[5px] text-[14px] font-normal
          ${selectedTypes.includes('DRY') ? 'text-gray-stroke70' : 'text-gray-stroke30'}
           hover:bg-gray-stroke02 rounded-md
          transition duration-300 cursor-pointer
  `}
        >
          {selectedTypes.includes('DRY') ? (
            <img className="w-[10px]" src={IconCheckNoBgActive} alt="" />
          ) : (
            <img className="w-[10px]" src={IconCheckNoBgInactive} alt="" />
          )}
          건성
        </li>
        <li
          onClick={() => onClickTypes('OILY')}
          className={`
          flex gap-[10px] px-[14px] py-[5px] text-[14px] font-normal
          ${selectedTypes.includes('OILY') ? 'text-gray-stroke70' : 'text-gray-stroke30'}
          hover:bg-gray-stroke02 rounded-md
          transition duration-300 cursor-pointer
  `}
        >
          {selectedTypes.includes('OILY') ? (
            <img className="w-[10px]" src={IconCheckNoBgActive} alt="" />
          ) : (
            <img className="w-[10px]" src={IconCheckNoBgInactive} alt="" />
          )}
          지성
        </li>
        <li
          onClick={() => onClickTypes('SENSITIVE')}
          className={`
          flex gap-[10px] px-[14px] py-[5px] text-[14px] font-normal
          ${selectedTypes.includes('SENSITIVE') ? 'text-gray-stroke70' : 'text-gray-stroke30'}
           hover:bg-gray-stroke02 rounded-md
          transition duration-300 cursor-pointer
  `}
        >
          {selectedTypes.includes('SENSITIVE') ? (
            <img className="w-[10px]" src={IconCheckNoBgActive} alt="" />
          ) : (
            <img className="w-[10px]" src={IconCheckNoBgInactive} alt="" />
          )}
          민감성
        </li>
        <li
          onClick={() => onClickTypes('COMBINED')}
          className={`
          flex gap-[10px] px-[14px] py-[5px] text-[14px] font-normal
          ${selectedTypes.includes('COMBINED') ? 'text-gray-stroke70' : 'text-gray-stroke30'}
          hover:bg-gray-stroke02 rounded-md
          transition duration-300 cursor-pointer
  `}
        >
          {selectedTypes.includes('COMBINED') ? (
            <img className="w-[10px]" src={IconCheckNoBgActive} alt="" />
          ) : (
            <img className="w-[10px]" src={IconCheckNoBgInactive} alt="" />
          )}
          복합성
        </li>

        {/* ...나머지도 같은 형식 */}
      </ul>
    </div>
  );
};

export default TypeDropDown;
