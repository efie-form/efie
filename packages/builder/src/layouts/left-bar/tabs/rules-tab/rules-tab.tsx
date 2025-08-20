import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { FaPlus } from 'react-icons/fa6';
import Button from '../../../../components/elements/button';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { cn } from '../../../../lib/utils';
import { RuleItem } from './rule-item';

function RulesTab() {
  const allRules = useSchemaStore((state) => state.getAllRules());
  const { addRule, moveRule } = useSchemaStore();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleAddNewRule = () => {
    addRule({
      id: '',
      enabled: true,
      triggers: [],
      actions: [],
      when: {
        logic: 'all',
        children: [{}],
      },
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;
    if (active.id !== over.id) {
      const activeIndex = allRules.findIndex((r) => r.id === active.id);
      const overIndex = allRules.findIndex((r) => r.id === over.id);
      moveRule(activeIndex, overIndex);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end px-4 pt-2">
        <Button onClick={handleAddNewRule} className="w-full" startIcon={FaPlus}>
          Add new rule
        </Button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={allRules.map((r) => r.id)}>
          <ul className={cn('flex flex-col pb-4')}>
            {allRules.map((r) => (
              <li key={r.id}>
                <RuleItem rule={r} />
              </li>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default RulesTab;
