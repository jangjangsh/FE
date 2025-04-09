import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const ChatDetailPage = () => {
  let params = useParams();

  return (
    <>
      <div className="text-center p-10">
        <Header />
        <h1 className="text-2xl font-bold">chatdetail Page {params.sessionid}</h1>
      </div>
    </>
  );
};
export default ChatDetailPage;
