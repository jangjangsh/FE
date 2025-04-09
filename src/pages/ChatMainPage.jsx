import Header from '../components/Header';
import Sidebar from '../components/SideBar/SideBar';
import ChatInputBox from '../components/ChatDetailPage/ChatInputBox';
import ChatSection from '../components/ChatDetailPage/ChatSection';

const ChatMainPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <Header />
      <ChatSection></ChatSection>
    </div>
  );
};
export default ChatMainPage;
