import { FaRedo, FaUndo } from 'react-icons/fa';
import { useSchemaStore } from '../../../lib/state/schema.state';
import ToolbarButton from './toolbar-button';

function LeftToolbar() {
  const { undo, redo, canUndo, canRedo } = useSchemaStore();
  return (
    <div className="flex overflow-hidden rounded-md bg-neutral-50">
      <ToolbarButton Icon={FaUndo} onClick={undo} disabled={!canUndo()} />
      <ToolbarButton Icon={FaRedo} onClick={redo} disabled={!canRedo()} />
    </div>
  );
}

export default LeftToolbar;
