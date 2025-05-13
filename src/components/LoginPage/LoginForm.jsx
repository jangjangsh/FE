import GotoSignUp from './GotoSignUp';
import { IconEye, IconCheckInactive, IconCheckActive } from '../../utils/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import { useAuth } from '../../contexts/AuthContext'; // ✅ AuthContext 사용

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, errorMsg, loading } = useAuth(); // ✅ context에서 함수와 상태 가져오기
  const navigate = useNavigate();

  // 이메일 패스워드 다 입력 됐는지
  const isActive = email.trim() !== '' && password.trim() !== '';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // context 함수 사용
      navigate('/chat'); // 로그인 성공 시 이동
    } catch (err) {
      console.error(err);
      // errorMsg는 context에서 관리 → 여기선 별도 처리 필요 없음
    }
  };

  return (
    <>
      {/* 이메일 */}
      <input
        type="email"
        value={email}
        placeholder="아이디를 입력해주세요."
        onChange={(e) => setEmail(e.target.value)}
        className="w-full outline-none
        px-[16px] py-[14px] tracking-[-0.025em]
        border border-gray-stroke08 rounded-t-[8px] border-b-transparent
        focus:border focus:border-main
        placeholder-gray-stroke30 placeholder:font-medium"
      />

      {/* 비밀번호 */}
      <div
        className="w-full flex items-center px-[16px] py-[14px] gap-[12px] tracking-[-0.025em]
      border border-gray-stroke08 rounded-b-[8px]
      focus-within:border focus-within:border-main
      transition duration-200"
      >
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          placeholder="비밀번호를 입력해주세요."
          onChange={(e) => setPassword(e.target.value)}
          className="w-full outline-none
          placeholder-gray-stroke30 placeholder:font-medium
          "
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          <img className="h-[11px]" src={IconEye} alt="eye" />
        </button>
      </div>

      {/* 자동로그인 + 회원가입 */}
      <div className="w-full flex justify-between mt-[16px] mb-[24px] px-[1px]">
        <div
          className="flex gap-[6px] items-center cursor-pointer select-none group"
          onClick={() => setAutoLogin(!autoLogin)}
        >
          <img
            className="w-[18px] transition duration-150"
            src={autoLogin ? IconCheckActive : IconCheckInactive}
            alt="checkIcon"
          />
          <div
            className={`text-[14px] font-medium leading-[1.4] tracking-[-0.025em] ${
              autoLogin ? 'text-gray-600' : 'text-gray-stroke50'
            } group-hover:text-gray-600
            transition duration-150`}
          >
            자동 로그인
          </div>
        </div>
        <GotoSignUp />
      </div>

      {/* 에러 메시지 */}
      {errorMsg && (
        <div className="text-rederror text-[14px] font-medium leading-[1.4]">{errorMsg}</div>
      )}

      {/* 로그인 버튼 */}
      <Button text="로그인" onClick={handleLoginSubmit} disabled={loading} isActive={isActive} />
    </>
  );
};

export default LoginForm;
