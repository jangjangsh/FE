import api from './api'; // axios 인스턴스

// 1. 세션 생성
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

// 2. 세션 목록 조회
export const getChatSessionList = async () => {
  try {
    const { data } = await api.get('/api/chat/sessions');
    return data;
  } catch (error) {
    console.error('실패', error);
    throw error;
  }
};

// 3. 메시지 전송
export const sendChatMessages = async (sessionId, body) => {
  try {
    const { data } = await api.post(`/api/chat/${sessionId}/messages`, body);
    console.log('✅ 백엔드 응답:', data);
    return data;
  } catch (error) {
    console.error('메시지 전송 실패:', error);
    throw error;
  }
};

// 4. 세션별 메세지 조회
export const getChatMessages = async (sessionId) => {
  try {
    const { data } = await api.get(`/api/chat/sessions/${sessionId}/messages`);
    console.log('✅ 백엔드 응답:', data);
    return data;
  } catch (error) {
    // ✅ 에러 발생 시 콘솔에 에러 출력하고, 다시 에러 던지기
    console.error('API 호출 실패:', error);
    throw error;
  }
};
