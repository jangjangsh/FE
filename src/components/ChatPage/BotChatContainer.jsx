const SkinTypeLabel = {
  DRY: '건성',
  OILY: '지성',
  SENSITIVE: '민감성',
  COMBINATION: '복합성',
};

const BotChatContainer = ({ sessionId }) => {
  return (
    <>
      <div className="pb-4">🧪 추출 결과는 다음과 같습니다.</div>
      <div className="flex flex-col gap-6">
        {/* {sessionMessages.map((block) => (
          <div key={sessionMessages.skinType}>
            <div className="flex basis-1/4 gap-2 bg-main-buttonFill p-[4px] rounded-t-[10px] border border-main-typeStroke">
              {block.userMessage.skinTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleFilterSelect(block.userMessage.id, type)}
                  className={`
                    ${
                      activeFilters[block.userMessage.id] === type
                        ? 'bg-white text-main'
                        : 'text-main-buttonStroke'
                    }
                    basis-1/4 flex items-center justify-center
                    py-1 rounded-[8px]
                    text-[14px]
                    hover:bg-main-buttonFill hover:text-main-buttonHover duration-200
                  `}
                >
                  {SkinTypeLabel[type]}
                </button>
              ))}
            </div>

            <div className="bg-white border-t-0 border-[1px] border-main-typeStroke font-normal text-gray-stroke70 pl-[18px] pr-[16px] py-[16px] rounded-b-[15px] max-w-[100%] whitespace-pre-line break-words">
              {block.botMessages
                .filter((msg) => msg.skinType === activeFilters[block.userMessage.id])
                .map((msg, idx) => (
                  <div key={idx}>🤖 {msg.message}</div>
                ))}
            </div>
          </div>
        ))} */}
      </div>
    </>
  );
};

export default BotChatContainer;
