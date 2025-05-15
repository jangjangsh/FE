import { useNavigate } from 'react-router-dom';

const GotoSignUp = () => {
  const nav = useNavigate();
  return (
    <>
      <div
        className="text-gray-stroke50 text-[14px] leading-[1.4] tracking-[-0.025em] cursor-pointer
         hover:text-gray-600 transition duration-150"
        onClick={() => nav('/signup')}
      >
        회원가입
      </div>
    </>
  );
};
export default GotoSignUp;
