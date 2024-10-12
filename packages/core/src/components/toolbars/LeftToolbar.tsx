import { FaRedo, FaUndo } from 'react-icons/fa';
import ToolbarButton from './ToolbarButton.tsx';

function LeftToolbar() {
  return (
    <div className="flex bg-neutral-50 rounded-md overflow-hidden">
      <ToolbarButton Icon={FaUndo} />
      <ToolbarButton Icon={FaRedo} />
    </div>
  );
}

export default LeftToolbar;
