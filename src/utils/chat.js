import api from './api'; // axios 인스턴스

// 🟢 세션 생성
export const createChatSession = async () => {
  // 세션을 먼저 받을 것
  try {
    const { data } = await api.post('/api/chat/sessions');
    return data; // sessionId가 담겨져서 옴
  } catch (error) {
    console.error('실패', error);
    throw error;
  }
};

// 🟡 세션 목록 조회
export const getChatSessionList = async () => {
  try {
    const { data } = await api.get('/api/chat/sessions');
    return data;
  } catch (error) {
    console.error('실패', error);
    throw error;
  }
};

// 🔵 메시지 전송
export const sendChatMessages = async (sessionId, body) => {
  try {
    const { data } = await api.post(`/api/chat/${sessionId}/messages`, body);
    return data;
  } catch (error) {
    console.error('메시지 전송 실패:', error);
    throw error;
  }
};
