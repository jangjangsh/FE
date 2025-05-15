import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ChatProvider } from './contexts/ChatContext.jsx';
import { AuthProvider } from './contexts/AuthContext';

// async function enableMocking() {
//   if (import.meta.env.VITE_USE_MSW === 'true') {
//     const { worker } = await import('../mocks/browser');
//     await worker.start({
//       onUnhandledRequest: 'bypass',
//     });
//     console.log('[MSW] ✅ MSW 실행됨');
//   }
// }

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </AuthProvider>
  </BrowserRouter>
);
