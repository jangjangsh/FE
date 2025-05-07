import { IconSendBefore } from '../../utils/icons';
import { IconSendAfter } from '../../utils/icons';

const SendButton = ({ onClick, isInputFilled }) => {
  return (
    <button onClick={onClick} className="flex items-end">
      <img className="w-[40px]" src={isInputFilled ? IconSendAfter : IconSendBefore} alt="전송" />
    </button>
  );
};

export default SendButton;
