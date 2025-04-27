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

  const handleFilterSelect = (type) => {
    setActiveType(type);
  };

  return (
    <div className="flex flex-col">
      {/* 선택 버튼 */}
      <div className="flex gap-3 bg-main-chatFilter p-[4px] rounded-t-[10px] border border-main-buttonFill">
        {botMessages.map((msg, idx) => (
          <button
            key={idx}
            onClick={() => handleFilterSelect(msg.skinType)}
            className={`
              ${activeType === msg.skinType ? 'bg-white text-main border border-main-chatFilterStroke' : 'text-main-buttonStroke border border-main-chatFilter hover:bg-main-typeBackground hover:text-main-chatFilterHover duration-200 hover:border-main-chatFilter'}
              basis-1/4 flex items-center justify-center
              py-[5px] rounded-[8px]
              text-[14px]
              
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
