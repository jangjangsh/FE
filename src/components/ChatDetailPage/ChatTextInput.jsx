import TextareaAutosize from 'react-textarea-autosize';

const ChatTextInput = () => {
  return (
    <div className="flex w-full items-center">
      <TextareaAutosize
        minRows={1}
        maxRows={8} // 8줄까지만 높이 확장 후 스크롤
        placeholder="무엇을 추출할까요?"
        className="
        inline m-[6px]
        appearance-none border-none outline-none resize-none
        w-full h-full
        placeholder-gray-stroke30 focus:placeholder-white  text-black
        bg-transparent
        "
      />
    </div>
  );
};

export default ChatTextInput;
