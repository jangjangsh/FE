const Button = ({ text, onClick, disabled, isActive }) => {
  return (
    <button
      className={`relative w-full h-[50px] tracking-[-0.025em] rounded-[8px] text-white overflow-hidden  font-semibold
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        bg-login
      `}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="relative z-10">{text}</span>
      <div
        className={`absolute inset-0 rounded-[8px] bg-gd transition-opacity duration-200 font-semibold
          ${isActive ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </button>
  );
};

export default Button;
