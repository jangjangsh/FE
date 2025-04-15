import BotChat from './BotChat';
import { useState, useEffect } from 'react';
import { createChatBlocksFrom } from '../../utils/chatHelpers';
// 선택한 피부 타입 필터링 용 컨테이너

const EXAMPLE_MESSAGES = [
  {
    id: 1,
    sender: 'USER',
    skinTypes: ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
    message: '이 제품 어떤 피부에 좋아요?',
  },
  {
    id: 2,
    sender: 'BOT',
    skinType: 'DRY',
    message: '건성에게 괜찮습니다.',
  },
  {
    id: 3,
    sender: 'BOT',
    skinType: 'OILY',
    message: '지성 피부엔 피지 조절이 필요합니다.',
  },
  {
    id: 4,
    sender: 'BOT',
    skinType: 'SENSITIVE',
    message: '민감성에게는 자극이 될 수 있어요.',
  },
  {
    id: 5,
    sender: 'BOT',
    skinType: 'COMBINATION',
    message: '복합성은 부위별로 달라요.',
  },
  {
    id: 6,
    sender: 'USER',
    skinTypes: ['SENSITIVE', 'OILY'],
    message: '그럼 지성 피부엔 어때요?',
  },
  {
    id: 7,
    sender: 'BOT',
    skinType: 'SENSITIVE',
    message: '민감성은 주의가 필요합니다.',
  },
  {
    id: 8,
    sender: 'BOT',
    skinType: 'OILY',
    message: '지성에겐 피지 조절이 포인트예요.',
  },
];

const SkinTypeLabel = {
  DRY: '건성',
  OILY: '지성',
  SENSITIVE: '민감성',
  COMBINATION: '복합성',
};

const BotChatContainer = ({ sessionMessages = EXAMPLE_MESSAGES }) => {
  const validatedMessages =
    sessionMessages && sessionMessages.length > 0 ? sessionMessages : EXAMPLE_MESSAGES;
  const chatBlocks = createChatBlocksFrom(validatedMessages);
  const [activeFilters, setActiveFilters] = useState({});

  console.log('blocks:', chatBlocks);
  console.log('filters:', activeFilters);

  // 초기 필터 설정
  useEffect(() => {
    const initial = {};
    chatBlocks.forEach((block) => {
      if (block.userMessage.skinTypes.length > 0) {
        initial[block.userMessage.id] = block.userMessage.skinTypes[0];
      }
    });
    setActiveFilters(initial);
  }, [validatedMessages]);

  const handleFilterSelect = (blockId, type) => {
    setActiveFilters((prev) => ({
      ...prev,
      [blockId]: type,
    }));
  };

  return (
    <>
      <div className="pb-4">🧪 추출 결과는 다음과 같습니다.</div>
      <div className="flex flex-col gap-6">
        {chatBlocks.map((block) => (
          <div key={block.userMessage.id} className="">
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
        ))}
      </div>
    </>
  );
};

export default BotChatContainer;
