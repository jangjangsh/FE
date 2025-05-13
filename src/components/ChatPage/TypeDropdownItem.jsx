const TypeDropDownItem = ({ label, selected, onClick, iconActive, iconInactive }) => {
  return (
    <li
      onClick={onClick}
      className={`
        flex gap-[10px] px-2 py-1.5 text-[14px] font-normal
        ${selected ? 'text-gray-stroke70' : 'text-gray-stroke30'}
        hover:bg-gray-stroke02 rounded-md
        transition duration-300 cursor-pointer
      `}
    >
      <img className="w-[10px]" src={selected ? iconActive : iconInactive} alt="" />
      <span className={`${selected && 'font-medium'}`}>{label}</span>
    </li>
  );
};

export default TypeDropDownItem;
