import { FaRedo, FaUndo } from 'react-icons/fa';
import ToolbarButton from './ToolbarButton';
import { useSchemaStore } from '../../../lib/state/schema.state';

function LeftToolbar() {
  const { undo, redo, canUndo, canRedo } = useSchemaStore();
  return (
    <div className="flex bg-neutral-50 rounded-md overflow-hidden">
      <ToolbarButton Icon={FaUndo} onClick={undo} disabled={!canUndo()} />
      <ToolbarButton Icon={FaRedo} onClick={redo} disabled={!canRedo()} />
    </div>
  );
}

export default LeftToolbar;
