import { IconLogo } from '../../utils/icons';
import { Logo } from '../../utils/icons';

const LogoSection = () => {
  return (
    <div
      className="flex space-x-[6px] border-red-600
    mt-[80px] mb-[36px]"
    >
      <img className="w-[37px]" src={IconLogo} alt="LogoImg" />
      <img className="w-[138px]" src={Logo} alt="Logo" />
    </div>
  );
};
export default LogoSection;
