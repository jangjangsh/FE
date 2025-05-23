import { Routes, Route } from 'react-router-dom';
import ChatMainPage from './pages/ChatMainPage';
import ChatDetailPage from './pages/ChatDetailPage';
import MyPage from './pages/MyPage';
import NotFound from './pages/Notfound';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { ChatProvider } from './contexts/ChatContext';
import IndexPage from './pages/IndexPage';

import KakaoCallback from './pages/KakaoCallback';
function App() {
  return (
    <ChatProvider>
      <Routes>
        {/* 0. 메인 (대시보드 or 초기화면 - 챗봇 세션 목록) */}
        <Route path="/" element={<IndexPage />} />

        {/* 1. 로그인 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/kakao" element={<KakaoCallback />} />

        {/* 2. 회원가입 */}
        <Route path="/signup" element={<SignUpPage />} />

        {/* 3. 챗봇 */}
        <Route path="/chat">
          <Route index element={<ChatMainPage />} />
          <Route path=":sessionId" element={<ChatDetailPage />} />
        </Route>

        {/* 4. 마이페이지 */}
        <Route path="/mypage" element={<MyPage />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />

        {/* {/* 5. 인증 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="/login/google/callback" element={<GoogleCallback />} /> */}
        {/* <Route path="/login/kakao/callback" element={<KakaoCallback />} /> */}

        {/* 6. 비회원 제한 처리 페이지 (예: 횟수 제한 안내) */}
        {/* <Route path="/guest-limit" element={<GuestLimitPage />} /> */}

        {/* 7. 템플릿 (추후 기능)
        <Route path="/templates" element={<TemplatePage />} /> */}
      </Routes>
    </ChatProvider>
  );
}

export default App;
