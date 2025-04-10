import { useRef, useEffect } from 'react';
import TypeSelector from './TypeSelector';

const TypeSelectorBox = ({
  isDropdownOpen,
  setIsDropdownOpen,
  selectedTypes,
  setSelectedTypes,
}) => {
  const ref = useRef(null);

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

  console.log('현재 상태: ' + isDropdownOpen);

  return (
    <div ref={ref}>
      <TypeSelector
        onClick={onClick}
        isDropdownOpen={isDropdownOpen}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
      />
    </div>
  );
};

export default TypeSelectorBox;
