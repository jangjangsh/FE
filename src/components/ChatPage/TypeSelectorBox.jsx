import { useRef, useEffect } from 'react';
import TypeSelector from './TypeSelector';
import TypeFilterList from './TypeFilterList';

const TypeSelectorBox = ({
  isDropdownOpen,
  setIsDropdownOpen,
  selectedTypes,
  setSelectedTypes,
  sessionMessages,
  direction = 'up',
}) => {
  const ref = useRef(null);
  const dropdownPositionClass = direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'; // 아래 방향은 top 기준!

  const onClick = () => {
    setIsDropdownOpen(true);
  };

  // 바깥 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsDropdownOpen(false); // 바깥 클릭 시 닫기
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setIsDropdownOpen]);

  return (
    <div className="flex gap-3">
      <div ref={ref}>
        <TypeSelector
          onClick={onClick}
          isDropdownOpen={isDropdownOpen}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          dropdownPositionClass={dropdownPositionClass}
          direction={direction}
        />
      </div>
      <div className="flex">
        <TypeFilterList selectedTypes={selectedTypes} sessionMessages={sessionMessages} />
      </div>
    </div>
  );
};

export default TypeSelectorBox;
