import Header from '../components/Header';
import SignUpForm from '../components/SignUpPage/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="">
      <div className="relative h-screen overflow-y-auto">
        <Header />
        {/* 본문 전체: 헤더 제외 + InputBox 제외 */}
        <div className="flex justify-center items-center">
          <div
            className="pt-[60px] w-[320px] gap-[48px] overflow-hidden
            flex flex-col justify-center items-center"
          >
            <div className="text-[28px] font-bold mt-[48px]">회원가입</div>
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
