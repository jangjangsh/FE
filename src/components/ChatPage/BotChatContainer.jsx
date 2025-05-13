import { useState, useEffect, useRef } from 'react';
import { IconLogo } from '../../utils/icons';

const SkinTypeLabel = {
  DRY: '건성',
  OILY: '지성',
  SENSITIVE: '민감성',
  COMBINED: '복합성',
};

const BotChatContainer = ({ botMessages, onAnswerComplete }) => {
  const [activeType, setActiveType] = useState(botMessages[0].skinType);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAlternate, setShowAlternate] = useState(false);
  const buttonRefs = useRef([]);
  const seenSkinTypes = new Set();

  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  // 첫번째 피부 타입
  useEffect(() => {
    if (showAlternate && buttonRefs.current[activeIndex]) {
      const btn = buttonRefs.current[activeIndex];
      setIndicatorStyle({
        width: btn.offsetWidth,
        left: btn.offsetLeft,
      });
    }
  }, [activeIndex, botMessages, showAlternate]);

  // 스크롤 영역
  useEffect(() => {
    if (showAlternate) {
      onAnswerComplete?.(); // ✅ 콜백 실행
    }
  }, [showAlternate]);

  if (!botMessages || botMessages.length === 0) {
    return null;
  }

  const handleFilterSelect = (type, idx) => {
    setActiveType(type);
    setActiveIndex(idx);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlternate(true);
    }, 5000); // 5초 후 true로 변경

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, []);

  return (
    <div className="pl-2 flex flex-col w-full">
      {/* 스포이드 추출 결과 안내 문구 */}
      <div className="flex items-center py-4 ">
        <img className="w-7" src={IconLogo} alt="" />
        {showAlternate ? (
          <span className="ml-2 text-16 font-medium bg-gradient-to-r from-main to-main-purple bg-clip-text text-transparent">
            SSPOID 추출 결과는 다음과 같습니다.
          </span>
        ) : (
          <span className="relative ml-2 text-16 font-medium bg-gradient-to-r from-main to-main-purple bg-clip-text text-transparent overflow-hidden timer-glass opacity-50">
            SSPOID가 리뷰를 추출 중입니다...
          </span>
        )}
      </div>

      {/* 피부 타입 선택 */}
      {showAlternate ? (
        <div className="relative flex w-full bg-main-2 rounded-t-[10px]">
          {botMessages.map((msg, idx) => {
            if (seenSkinTypes.has(msg.skinType)) {
              return null; // 이미 본 타입은 버튼 안 만듦
            }
            seenSkinTypes.add(msg.skinType); // 새로운 타입 추가

            return (
              <button
                key={idx}
                ref={(el) => (buttonRefs.current[idx] = el)}
                onClick={() => handleFilterSelect(msg.skinType, idx)}
                className={`
                z-10 text-[14px] font-medium py-[7px] [width:calc((100%)/4)]
                border-b-2 border-main-7
                ${activeType === msg.skinType ? 'text-main font-semibold' : 'text-main-buttonStroke hover:text-main-chatFilterHover hover:border-main-20 duration-200'}
              `}
              >
                {SkinTypeLabel[msg.skinType]}
              </button>
            );
          })}

          {/* 움직이는 강조선 */}
          <span
            className="absolute bottom-0 h-[2px] bg-main transition-all duration-500 ease-in-out"
            style={{
              width: `${indicatorStyle.width}px`,
              left: `${indicatorStyle.left}px`,
            }}
          />
        </div>
      ) : null}

      {showAlternate && (
        <div className=" flex flex-col w-full mb-6 ">
          {/* 챗 답변 렌더링 구간 */}
          <div className="bg-white font-normal text-gray-stroke70  max-w-[100%] whitespace-pre-line break-words leading-[1.8]">
            {botMessages
              .filter((msg) => msg.skinType === activeType)
              .map((msg, idx) => (
                <div className="h-full w-full py-6  group" key={idx}>
                  <span className="block h-full w-full px-6">{msg.message}</span>

                  <div className="relative top-6 w-full h-[1.5px] bg-main-20">
                    {/* 기본 선 위에 겹치는 그라데이션 선 */}
                    <div
                      className="
                      absolute top-0 left-0 w-full h-full
                      bg-gradient-to-r from-main to-main-purple
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-1000
                      "
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BotChatContainer;
