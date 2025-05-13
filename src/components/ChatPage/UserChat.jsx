import BotChat from './BotChat';

// 사용자 채팅
const UserChat = ({ message }) => {
  return (
    <div>
      <div className="flex justify-end">
        <div className="bg-gray-stroke03 font-normal opacity-90 px-[16px] py-[10px] rounded-[20px] max-w-[70%] whitespace-pre-line break-words mt-3 leading-[1.6]">
          {message}
        </div>
      </div>
    </div>
  );
};

export default UserChat;
