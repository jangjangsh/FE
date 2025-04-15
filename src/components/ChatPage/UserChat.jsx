import BotChat from './BotChat';

// 사용자 채팅
const UserChat = ({ message }) => {
  return (
    <div>
      <div className="flex justify-end">
        <div className="bg-gray-stroke03 font-normal text-gray-stroke70 pl-[18px] pr-[16px] py-[16px] rounded-[20px] max-w-[70%] whitespace-pre-line break-words my-6">
          {message}
        </div>
      </div>
    </div>
  );
};

export default UserChat;
