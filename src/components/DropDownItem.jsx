const DropDownItem = ({ icon: Icon, label, textColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className=" flex items-center w-fit px-2 py-1.5 justify-center hover:bg-gray-stroke02 rounded-[6px] duration-200"
    >
      <div className="w-4 mx-[4px]">
        <img src={Icon} alt="" />
      </div>
      <span className={`text-[14px] px-[4px] whitespace-nowrap inline ${textColor}`}>{label}</span>
    </button>
  );
};

export default DropDownItem;
