import api from './api'; // axios 인스턴스

// 북마크 생성
export const addBookmark = async (sessionId) => {
  try {
    await api.post('/api/bookmarks', { sessionId });
    return { success: true };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      (error.response?.status === 404
        ? '해당 세션 ID가 존재하지 않습니다.'
        : '북마크 추가 중 오류 발생');
    return { success: false, error: message };
  }
};

// 북마크 삭제
export const removeBookmark = async (sessionId) => {
  try {
    await api.delete(`/api/bookmarks/${sessionId}`);
    return { success: true };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      (error.response?.status === 404
        ? '해당 세션 ID가 존재하지 않습니다.'
        : '북마크 삭제 중 오류 발생');
    return { success: false, error: message };
  }
};

// 북마크 목록 조회
export const getBookmarks = async () => {
  try {
    const { data } = await api.get('/api/bookmarks');
    return { success: true, data };
  } catch (error) {
    const message = error.response?.data?.message || '북마크 목록을 불러오는 중 오류 발생';
    return { success: false, error: message };
  }
};
