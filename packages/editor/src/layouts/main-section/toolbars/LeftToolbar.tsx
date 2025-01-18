import { FaRedo, FaUndo } from 'react-icons/fa';
import ToolbarButton from './ToolbarButton.tsx';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';

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
