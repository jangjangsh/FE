import { IconSendBefore } from '../../utils/icons';
import { IconSendAfter } from '../../utils/icons';

const SendButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="flex items-end">
      <img className="w-[36px]" src={IconSendBefore} alt="전송" />
    </button>
  );
};

export default SendButton;
