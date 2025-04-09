import ChatTextInput from './ChatTextInput';
import SendButton from './SendButton';
import TypeSelector from './TypeSelector';
import TypeSelectorBox from './TypeSelectorBox';

// 채팅 입력창 컨테이너
const ChatInputBox = () => {
  return (
    <section className="w-full pb-3">
      <div
        className="
        fixed
        flex flex-col w-[760px]
      rounded-[20px]
      border border-gray-stroke07 focus-within:border-gray-stroke10
      shadow-[0_2px_10px_rgba(0,0,0,0.03)] focus-within:shadow-[0_2px_10px_rgba(0,0,0,0.05)]
    "
      >
        <div className="flex w-full px-[12px] py-[10px] border-b border-gray-stroke07">
          <ChatTextInput />
          <SendButton />
        </div>
        <div className="flex w-full items-center p-[10px]">
          <TypeSelectorBox />
        </div>
      </div>
    </section>
  );
};

export default ChatInputBox;
