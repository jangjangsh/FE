import Header from '../components/Header';
import Sidebar from '../components/SideBar/SideBar';
import ChatInputBox from '../components/ChatDetailPage/ChatInputBox';
import ChatSection from '../components/ChatDetailPage/ChatSection';

const ChatMainPage = () => {
  return (
    <>
      <Header />
      <ChatSection></ChatSection>
      <ChatInputBox></ChatInputBox>
    </>
  );
};
export default ChatMainPage;
