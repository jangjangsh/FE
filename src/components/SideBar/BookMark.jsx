import { useContext, useState } from 'react';
import { ChatContext } from '../../contexts/ChatContext';
import { addBookmark, removeBookmark } from '../../utils/bookmark';
import { IconStarG, IconStarY } from '../../utils/icons';

const BookMark = ({ session }) => {
  const { toggleBookmark } = useContext(ChatContext);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.stopPropagation(); // 부모 클릭 이벤트 방지
    if (loading) return;
    setLoading(true);

    try {
      if (session.isBookmark) {
        const res = await removeBookmark(session.sessionId);
        if (res.success) toggleBookmark(session.sessionId); // 해제
      } else {
        const res = await addBookmark(session.sessionId);
        if (res.success) toggleBookmark(session.sessionId); // 추가
      }
    } catch (err) {
      console.error('북마크 토글 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <img
      className="w-[16px] h-[16px] shrink-0
      transition-transform duration-200 ease-in-out hover:scale-110"
      src={session.isBookmark ? IconStarY : IconStarG}
      alt="즐겨찾기"
      onClick={handleClick}
    />
  );
};

export default BookMark;
