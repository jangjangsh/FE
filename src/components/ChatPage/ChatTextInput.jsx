import TextareaAutosize from 'react-textarea-autosize';

const ChatTextInput = ({ input, onChangeInput }) => {
  return (
    <div className="flex w-full items-center">
      <TextareaAutosize
        onChange={onChangeInput}
        value={input}
        minRows={1}
        maxRows={7} // 8줄까지만 높이 확장 후 스크롤
        placeholder="질문을 입력해주세요."
        className="
        inline px-[8px] mt-[4px]
        appearance-none border-none outline-none resize-none
        w-full h-full chat-scrollbar-custom
        placeholder-gray-stroke30 focus:placeholder-white  text-black
        bg-transparent
        "
      />
    </div>
  );
};

export default ChatTextInput;
