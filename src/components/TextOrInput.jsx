import { useRef, useEffect } from 'react';

const TextOrInput = ({
  value,
  isEditing,
  onStartEdit,
  onChange,
  onSave,
  onCancel,
  className = '',
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSave();
    if (e.key === 'Escape') onCancel();
  };

  return isEditing ? (
    <input
      ref={inputRef}
      type="text"
      className={`bg-transparent outline-none leading-[1.4] align-middle ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onSave}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <span
      className={`inline-block cursor-pointer leading-[1.4] align-middle ${className}`}
      onDoubleClick={onStartEdit}
    >
      {value || '제목을 입력해주세요.'}
    </span>
  );
};

export default TextOrInput;
