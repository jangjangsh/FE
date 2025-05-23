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
  const accessToken = localStorage.getItem('accessToken'); // ✅ 토큰 가져오기
  try {
    const { data: newSession } = await api.post(
      '/api/chat/sessions',
      {}, // ✅ 명세상 request body 없음
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // ✅ 헤더 추가
        },
      }
    );
    const updatedSessions = await fetchChatSessions();
    return { newSession, updatedSessions };
  } catch (error) {
    console.error('세션 생성 실패:', error);
    throw error;
  }
};

// 제목 수정
export const updateChatTitle = async (sessionId, newTitle, accessToken) => {
  try {
    const { data } = await api.patch(
      `/api/chat/sessions/${sessionId}/title`,
      { title: newTitle },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data; // { sessionId, title, isBookmark } 형태
  } catch (error) {
    console.error('제목 수정 실패:', error);
    throw error;
  }
};

// 3. 메시지 전송
// chat.js
export const sendChatMessages = async (body, sessionId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await fetch(`https://43.203.173.135/api/chat/${sessionId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ 백엔드 응답:', data);
    return data;
  } catch (error) {
    console.error('메시지 전송 실패:', error);
    throw error;
  }
};

// 4. 세션별 메세지 조회
export const getChatMessages = async (sessionId) => {
  const accessToken = localStorage.getItem('accessToken'); // 🔐 토큰 가져오기

  try {
    const { data } = await api.get(`/api/chat/sessions/${sessionId}/messages`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('✅ 백엔드 응답:', data);
    return data;
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
};

// 세션 삭제
export const deleteChatSession = async (sessionId, accessToken) => {
  try {
    await api.delete(`/api/chat/sessions/${sessionId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { success: true };
  } catch (error) {
    const message = error.response?.data?.message || '세션 삭제 중 오류 발생';
    return { success: false, error: message };
  }
};

// 요약 기능
export const getChatSummary = async (sessionId) => {
  const accessToken = localStorage.getItem('accessToken'); // ✅ 로컬에서 토큰 가져오기

  try {
    const { data } = await api.get(`/api/chat/sessions/${sessionId}/summary`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('✅ 백엔드 응답:', data);
    return data;
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
};
