import { useState } from 'react';

const SkinTypeLabel = {
  DRY: '건성',
  OILY: '지성',
  SENSITIVE: '민감성',
  COMBINED: '복합성',
};

const BotChatContainer = ({ botMessages }) => {
  if (!botMessages || botMessages.length === 0) {
    return null; // 에러 방어 코드
  }

  // 첫 번째 bot 메세지의 skinType을 기준으로 activeType 설정
  const [activeType, setActiveType] = useState(botMessages[0].skinType);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleFilterSelect = (type) => {
    setActiveType(type);
  };

  return (
    <div className="flex flex-col w-full">
      {/* 선택 버튼 */}
      <div className="relative flex w-full gap-0.5 bg-main-chatFilter p-[4px] rounded-t-[10px] border border-main-buttonFill">
        {/* 하이라이트 배경판 (추가!!) */}
        <div
          className="absolute top-[4px] left-[4px] h-[calc(100%-8px)] bg-white rounded-[8px] transition-transform duration-300 ease-in-out"
          style={{
            width: 'calc((100% - 8px) / 4)', // 버튼 폭 기준
            transform: `translateX(calc(${activeIndex * 100}%)`,
          }}
        />
        {botMessages.map((msg, idx) => (
          <button
            key={idx}
            onClick={() => {
              handleFilterSelect(msg.skinType);
              setActiveIndex(idx);
            }}
            className={`
              ${
                activeType === msg.skinType
                  ? 'z-10 text-main'
                  : 'z-10 text-main-buttonStroke hover:bg-main-typeBackground hover:text-main-chatFilterHover duration-200 hover:border-main-chatFilter'
              }
              
              [width:calc((100%-6px)/4)]
              items-center justify-center
                py-[5px] rounded-[8px]
                text-[14px]
                transition-all duration-200 ease-in-out
            `}
          >
            {SkinTypeLabel[msg.skinType]}
          </button>
        ))}
      </div>

      {/* Bot 답변 보여주는 영역 */}
      <div className="bg-white border-t-0 border-[1px] border-main-typeStroke font-normal text-gray-stroke70 pl-[18px] pr-[16px] py-[16px] rounded-b-[15px] max-w-[100%] whitespace-pre-line break-words">
        {botMessages
          .filter((msg) => msg.skinType === activeType)
          .map((msg, idx) => (
            <div key={idx}>{msg.message}</div>
          ))}
      </div>
    </div>
  );
};

export default BotChatContainer;
