import { useEffect, useState } from 'react';
import { getChatSummary } from '../../utils/chat'; // ✅ 바뀐 함수 import
import { IconCancel } from '../../utils/icons';
import { IconSummaryBlue } from '../../utils/icons';

const SessionSummary = ({ onClick, sessionId }) => {
  const [summary, setSummary] = useState('');

  const fetchSummary = async (sessionId) => {
    try {
      const res = await getChatSummary(sessionId); // ✅ get 함수 사용
      setSummary(res.summarizedMessage); // ✅ 응답 구조는 그대로 유지
      console.log('요약 내용:', res.summarizedMessage);
      return res.summarizedMessage;
    } catch (error) {
      console.error('요약 요청 실패', error);
      return null;
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSummary(sessionId);
    }
  }, [sessionId]);

  return (
    <div className="flex justify-center fixed left-0 top-0 w-screen h-screen z-50">
      {/* overlay */}
      <div className="fixed inset-0 bg-black animate-fadeIn"></div>
      <div className="bg-white backdrop-blur-lg w-[760px] h-[512px] mt-[80px] rounded-[20px] border border-gray-stroke07 shadow-modal animate-modalIn ">
        <div className="flex items-center justify-between px-8 pt-6 pb-5 border-b border-gray-stroke05">
          {/* 모달창 상단 (취소 버튼) */}
          <div className="flex items-center gap-2 ">
            <img src={IconSummaryBlue} alt="요약" />
            <span className="text-[18px] font-semibold text-main ">현재 채팅방 내용 요약</span>
          </div>
          <img
            onClick={onClick}
            className="cursor-pointer w-3 opacity-50 hover:opacity-100 transition-all duration-200"
            src={IconCancel}
            alt="취소"
          />
        </div>
        {/* 모달창 하단 (요약 내용 확인) */}
        <div className="overflow-y-auto px-9 mt-6 mr-6 h-[calc(512px-80px-24px-24px)] chat-scrollbar-custom whitespace-pre-line">
          <span className="opacity-80 leading-[1.4]">{summary}</span>
        </div>
      </div>
    </div>
  );
};

export default SessionSummary;
