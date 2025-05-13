// import { useRef, useEffect } from 'react';

import { useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { IconCheckNoBgInactive } from '../../utils/icons';
import { IconCheckNoBgActive } from '../../utils/icons';
import TypeDropDownItem from './TypeDropdownItem';

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
        rounded-[12px]
        shadow-[0_0_10px_rgba(0,0,0,0.05)]
        p-[6px] z-10"
      >
        <TypeDropDownItem
          label="건성"
          selected={selectedTypes.includes('DRY')}
          onClick={() => onClickTypes('DRY')}
          iconActive={IconCheckNoBgActive}
          iconInactive={IconCheckNoBgInactive}
        />
        <TypeDropDownItem
          label="지성"
          selected={selectedTypes.includes('OILY')}
          onClick={() => onClickTypes('OILY')}
          iconActive={IconCheckNoBgActive}
          iconInactive={IconCheckNoBgInactive}
        />
        <TypeDropDownItem
          label="민감성"
          selected={selectedTypes.includes('SENSITIVE')}
          onClick={() => onClickTypes('SENSITIVE')}
          iconActive={IconCheckNoBgActive}
          iconInactive={IconCheckNoBgInactive}
        />
        <TypeDropDownItem
          label="복합성"
          selected={selectedTypes.includes('COMBINED')}
          onClick={() => onClickTypes('COMBINED')}
          iconActive={IconCheckNoBgActive}
          iconInactive={IconCheckNoBgInactive}
        />
      </ul>
    </div>
  );
};

export default TypeDropDown;
