import { Routes, Route } from 'react-router-dom';
import ChatMainPage from './pages/ChatMainPage';
import ChatDetailPage from './pages/ChatDetailPage';
import MyPage from './pages/MyPage';
import NotFound from './pages/Notfound';
import { ChatProvider } from './contexts/ChatContextsh';
// import IndexPage from './pages/IndexPage';
// import LoginPage from './pages/LoginPage';
// import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <ChatProvider>
      <Routes>
        {/* 1. 메인 (대시보드 or 초기화면 - 챗봇 세션 목록) */}
        <Route path="/" element={<ChatMainPage />} />

        {/* 2. 챗봇 */}
        <Route path="/chat">
          <Route index element={<ChatMainPage />} />
          <Route path=":sessionId" element={<ChatDetailPage />} />
        </Route>

        {/* 3. 마이페이지 */}
        <Route path="/mypage" element={<MyPage />} />

        {/* 4. 404 Not Found */}
        <Route path="*" element={<NotFound />} />

        {/* 5. 인증
       <Route path="/login" element={<LoginPage />} />
       <Route path="/signup" element={<SignUpPage />} />
       <Route path="/login/google/callback" element={<GoogleCallback />} />
       <Route path="/login/kakao/callback" element={<KakaoCallback />} /> */}

        {/* 6. 비회원 제한 처리 페이지 (예: 횟수 제한 안내) */}
        {/* <Route path="/guest-limit" element={<GuestLimitPage />} /> */}

        {/* 7. 템플릿 (추후 기능)
        <Route path="/templates" element={<TemplatePage />} /> */}
      </Routes>
    </ChatProvider>
  );
}

export default App;
