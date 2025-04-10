import TypeSelector from './TypeSelector';

// 피부 타입 선택 컨테이너
const TypeSelectorBox = ({ isDropdownOpen, setIsDropdownOpen }) => {
  const onClick = () => {
    setIsDropdownOpen(true);
  };
  console.log('현재 상태: ' + isDropdownOpen);

  return (
    <div>
      <TypeSelector onClick={onClick} isDropdownOpen={isDropdownOpen} />
    </div>
  );
};

export default TypeSelectorBox;
