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
  const spanRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current && spanRef.current) {
      const rawWidth = spanRef.current.offsetWidth;
      const width = value === '' ? rawWidth : rawWidth + 1;
      inputRef.current.style.width = `${width}px`;
    }
  }, [value, isEditing]);

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
  return (
    <div className="inline-flex truncate items-center relative">
      <span
        ref={spanRef}
        className={`invisible absolute whitespace-pre text-[15px] font-medium leading-[1.4] ${className}`}
      >
        {value}
      </span>

      {!isEditing && value !== '' && (
        <span
          className={`inline-block cursor-pointer whitespace-nowrap truncate text-[15px] font-medium leading-[1.4] ${className}`}
          onDoubleClick={onStartEdit}
        >
          {value}
        </span>
      )}

      {isEditing && (
        <input
          ref={inputRef}
          type="text"
          placeholder=""
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onSave}
          onKeyDown={handleKeyDown}
          className={`
            inline-block
            bg-transparent border-none outline-none
            text-[15px] font-medium leading-[1.4]
            whitespace-nowrap align-baseline
            ${className}
          `}
          style={{ minWidth: '10px', boxSizing: 'content-box' }}
        />
      )}
    </div>
  );
};

export default TextOrInput;
