import { useState, useEffect, useRef } from 'react';
import { IconLogo } from '../../utils/icons';
import { useChat } from '../../contexts/ChatContext';
import personaProfiles from '../../constants/personaProfiles';

const SkinTypeLabel = {
  DRY: '건성',
  OILY: '지성',
  SENSITIVE: '민감성',
  COMBINATION: '복합성',
};

const BotChatContainer = ({ botMessages, onAnswerComplete, blockId }) => {
  const [activeType, setActiveType] = useState(() => {
    const baseType = botMessages[0]?.skinType?.match(/^(DRY|OILY|SENSITIVE|COMBINATION)/)?.[0];
    return baseType || '';
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const { isBotBlockRevealed, markBotBlockAsRevealed, currentSessionId } = useChat();
  const [showAlternate, setShowAlternate] = useState(false);
  const buttonRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    if (isBotBlockRevealed(currentSessionId, blockId)) {
      setShowAlternate(true);
      return;
    }

    const timer = setTimeout(() => {
      markBotBlockAsRevealed(currentSessionId, blockId);
      setShowAlternate(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [blockId, currentSessionId]);

  // 첫번째 피부 타입 밑줄 렌더링
  useEffect(() => {
    if (showAlternate && buttonRefs.current[activeIndex]) {
      const btn = buttonRefs.current[activeIndex];
      setIndicatorStyle({
        width: btn.offsetWidth,
        left: btn.offsetLeft,
      });
    }
  }, [activeIndex, botMessages, showAlternate]);

  // showAlternate 변경 후 콜백 호출
  useEffect(() => {
    if (showAlternate) {
      onAnswerComplete?.();
    }
  }, [showAlternate]);

  if (!botMessages || botMessages.length === 0) return null;

  const handleFilterSelect = (type, idx) => {
    setActiveType(type);
    setActiveIndex(idx);
  };

  return (
    <div className="pl-1 flex flex-col w-full">
      {/* 안내 문구 */}
      <div className="flex items-center py-4">
        <img className="w-7" src={IconLogo} alt="" />
        {!showAlternate ? (
          <span className="ml-2 text-16 font-medium bg-gradient-to-r from-main to-main-purple bg-clip-text text-transparent overflow-hidden timer-glass opacity-50">
            SSPOID가 리뷰를 추출 중입니다...
          </span>
        ) : (
          <span className="ml-2 text-16 font-medium bg-gradient-to-r from-main to-main-purple bg-clip-text text-transparent">
            SSPOID 추출 결과는 다음과 같습니다.
          </span>
        )}
      </div>

      {/* 피부 타입 선택 버튼 */}
      {showAlternate && (
        <div className="relative flex w-full bg-main-2 rounded-t-[10px]">
          {(() => {
            const seenSkinTypes = new Set();
            return botMessages.map((msg, idx) => {
              const baseType = msg.skinType.match(/^(DRY|OILY|SENSITIVE|COMBINATION)/)?.[0];
              if (!baseType || seenSkinTypes.has(baseType)) return null;
              seenSkinTypes.add(baseType);

              return (
                <button
                  key={baseType}
                  ref={(el) => (buttonRefs.current[idx] = el)}
                  onClick={() => handleFilterSelect(baseType, idx)}
                  className={`
                    z-10 text-[14px] font-medium py-[7px] [width:calc((100%)/4)]
                    border-b-2 border-main-7
                    ${
                      activeType === baseType
                        ? 'text-main font-semibold'
                        : 'text-main-buttonStroke hover:text-main-chatFilterHover hover:border-main-20 duration-200'
                    }
                  `}
                >
                  {SkinTypeLabel[baseType] || baseType}
                </button>
              );
            });
          })()}

          {/* 강조선 */}
          <span
            className="absolute bottom-0 h-[2px] bg-main transition-all duration-500 ease-in-out"
            style={{
              width: `${indicatorStyle.width}px`,
              left: `${indicatorStyle.left}px`,
            }}
          />
        </div>
      )}

      {/* 메시지 표시 영역 */}
      {showAlternate && (
        <div className="group flex flex-col w-full mb-6">
          <div className="mt-[34px] bg-white font-normal text-gray-stroke70 max-w-[100%] whitespace-pre-line break-words leading-[1.8]">
            {botMessages
              .filter((msg) => {
                const baseType = msg.skinType.match(/^(DRY|OILY|SENSITIVE|COMBINATION)/)?.[0];
                return baseType === activeType;
              })
              .map((msg, idx) => {
                const baseType = msg.skinType.match(/^(DRY|OILY|SENSITIVE|COMBINATION)/)?.[0];
                const persona = personaProfiles[baseType]?.[idx] || '';

                return (
                  <div className="flex flex-col h-full w-full mt-2" key={idx}>
                    {/* 페르소나 설명 */}
                    <div className="flex items-center justify-center w-full">
                      {/* 왼쪽 선 */}
                      {/* <div className="flex-grow  h-[1px] bg-gradient-to-tr from-white to-main opacity-30" /> */}
                      <div className="flex-grow  h-[1px] bg-main opacity-10" />

                      {/* 텍스트 */}
                      <span className="mx-4 text-[14px] text-main font-medium whitespace-nowrap">
                        {persona}
                      </span>

                      {/* 오른쪽 선 */}
                      {/* <div className="flex-grow h-[1px] bg-gradient-to-tr to-white from-main opacity-30" /> */}

                      <div className="flex-grow  h-[1px] bg-main opacity-10" />
                    </div>
                    {/* 봇 응답 메시지 */}
                    <span className="block h-full w-full px-8 py-7 mt-1">{msg.message}</span>
                  </div>
                );
              })}
            {/* 메세지 끝났을 때 구분선 */}
            <div className="relative top-2 w-full h-[2px] bg-main-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-main to-main-purple opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotChatContainer;
