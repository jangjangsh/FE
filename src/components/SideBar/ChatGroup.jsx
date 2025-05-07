// ChatGroup.jsx
const ChatGroup = ({ title, children }) => {
  return (
    <div className=" mt-[12px]">
      <div className="text-[15px] font-bold text-gray px-[10px] mb-[10px] leading-[1.4]">
        {title}
      </div>
      <div className="flex flex-col ">{children}</div>
    </div>
  );
};

export default ChatGroup;
