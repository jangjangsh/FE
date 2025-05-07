import { useState, useEffect, useRef } from 'react';
import { IconLogo } from '../../utils/icons';

const SkinTypeLabel = {
  DRY: '건성',
  OILY: '지성',
  SENSITIVE: '민감성',
  COMBINED: '복합성',
};

const BotChatContainer = ({ botMessages }) => {
  const [activeType, setActiveType] = useState(botMessages[0].skinType);
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef([]);

  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    if (buttonRefs.current[activeIndex]) {
      const btn = buttonRefs.current[activeIndex];
      setIndicatorStyle({
        width: btn.offsetWidth,
        left: btn.offsetLeft,
      });
    }
  }, [activeIndex, botMessages]);

  if (!botMessages || botMessages.length === 0) {
    return null;
  }

  const handleFilterSelect = (type, idx) => {
    setActiveType(type);
    setActiveIndex(idx);
  };

  return (
    <div className="flex flex-col w-full">
      {/* 스포이드 추출 결과 안내 문구 */}
      <div className="flex items-center py-4">
        <img className="w-7" src={IconLogo} alt="" />
        <span className="ml-2 text-15 font-semibold bg-gradient-to-r from-main to-main-purple bg-clip-text text-transparent">
          스포이드 추출 결과는 다음과 같습니다.
        </span>
      </div>

      {/* 피부 타입 선택 */}
      <div className="relative flex w-full bg-main-2 rounded-t-[10px]">
        {botMessages.map((msg, idx) => (
          <button
            key={idx}
            ref={(el) => (buttonRefs.current[idx] = el)}
            onClick={() => handleFilterSelect(msg.skinType, idx)}
            className={`
              z-10 text-[14px] py-[6px] [width:calc((100%)/4)]
              border-b-2 border-main-buttonFill
              ${activeType === msg.skinType ? 'text-main font-medium' : 'text-main-buttonStroke hover:text-main-chatFilterHover hover:border-main-typeStroke duration-200'}
            `}
          >
            {SkinTypeLabel[msg.skinType]}
          </button>
        ))}

        {/* 움직이는 강조선 */}
        <span
          className="absolute bottom-0 h-[2px] bg-main transition-all duration-500 ease-in-out"
          style={{
            width: `${indicatorStyle.width}px`,
            left: `${indicatorStyle.left}px`,
          }}
        />
      </div>

      <div className="group flex flex-col w-full">
        {/* 챗 답변 렌더링 구간 */}
        <div className="bg-white font-normal text-gray-stroke70 px-[20px] py-[36px] max-w-[100%] whitespace-pre-line break-words leading-[1.6]">
          {botMessages
            .filter((msg) => msg.skinType === activeType)
            .map((msg, idx) => (
              <div key={idx}>{msg.message}</div>
            ))}
        </div>

        <div className="relative w-full h-[2px] bg-main-typeStroke">
          {/* 기본 선 위에 겹치는 그라데이션 선 */}
          <div
            className="
          absolute top-0 left-0 w-full h-full
          bg-gradient-to-r from-main to-main-purple
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          "
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BotChatContainer;
