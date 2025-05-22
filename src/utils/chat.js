import api from './api'; // axios 인스턴스

// 세션 목록 조회
export const fetchChatSessions = async () => {
  try {
    const { data } = await api.get('/api/chat/sessions');
    return data;
  } catch (error) {
    console.error('세션 목록 불러오기 실패:', error);
    throw error;
  }
};

// 세션 생성 (생성 후 목록 자동 새로고침)
export const createChatSession = async () => {
  try {
    const { data: newSession } = await api.post('/api/chat/sessions', {
      title: '제목을 입력해주세요.',
    });
    // 생성 후 목록 새로고침
    const updatedSessions = await fetchChatSessions();
    return { newSession, updatedSessions };
  } catch (error) {
    console.error('세션 생성 실패:', error);
    throw error;
  }
};

// 제목 수정
export const updateChatTitle = async (sessionId, newTitle) => {
  try {
    const { data } = await api.patch(`/api/chat/sessions/${sessionId}/title`, { title: newTitle });
    return data;
  } catch (error) {
    console.error('제목 수정 실패:', error);
    throw error;
  }
};

// 3. 메시지 전송
export const sendChatMessagesStream = async (sessionId, body, onBotChunk, onStreamEnd) => {
  try {
    const response = await fetch(`/api/chat/${sessionId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      // ✅ chunk 도착 시마다 실시간 렌더링 콜백
      if (onBotChunk) onBotChunk(chunk);
    }

    if (onStreamEnd) onStreamEnd();
  } catch (err) {
    console.error('스트리밍 실패:', err);
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

// 세션 삭제
export const deleteChatSession = async (sessionId) => {
  try {
    await api.delete(`/api/chat/sessions/${sessionId}`);
    return { success: true };
  } catch (error) {
    const message = error.response?.data?.message || '세션 삭제 중 오류 발생';
    return { success: false, error: message };
  }
};

// 요약 기능
export const postChatSummary = async (sessionId) => {
  try {
    const { data } = await api.post(`/api/chat/sessions/${sessionId}/summary`);
    console.log('✅ 백엔드 응답:', data);
    return data;
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
};
