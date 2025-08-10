import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import type { Rule } from '@efie-form/core';
import type { CSSProperties } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { MdOutlineDragIndicator } from 'react-icons/md';
import Button from '../../../components/elements/button';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useSettingsStore } from '../../../lib/state/settings.state';
import { cn } from '../../../lib/utils';

export default function RulesTab() {
  const allRules = useSchemaStore((state) => state.getAllRules());
  const { addRule, moveRule } = useSchemaStore();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleAddNewRule = () => {
    // Logic to add a new rule
    addRule({
      id: '',
      enabled: true,
      triggers: [],
      elseActions: [],
      branches: [],
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;

    if (active.id !== over.id) {
      // Logic to reorder the rules
      const activeIndex = allRules.findIndex((rule) => rule.id === active.id);
      const overIndex = allRules.findIndex((rule) => rule.id === over.id);
      moveRule(activeIndex, overIndex);
    }
  };

  return (
    <div>
      <div className="flex justify-end px-4 py-2">
        <Button onClick={handleAddNewRule} className="w-full" startIcon={FaPlus}>
          Add new rule
        </Button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={allRules.map((r) => r.id)}>
          <ul className="">
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

interface RuleItemProps {
  rule: Rule;
}

function RuleItem({ rule }: RuleItemProps) {
  const { setSelectedConditionId, setMode } = useSettingsStore();
  const selectedConditionId = useSettingsStore((state) => state.selectedConditionId);
  const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable({
    id: rule.id,
  });

  const style: CSSProperties = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition,
  };

  return (
    <button
      style={style}
      ref={setNodeRef}
      {...attributes}
      onClick={() => {
        setMode('conditions');
        setSelectedConditionId(rule.id);
      }}
      className={cn(
        'group relative flex w-full items-center px-1 py-2 hover:bg-neutral-100',
        isDragging ? 'z-50' : 'cursor-pointer',
        {
          'bg-neutral-200': isDragging,
          '!bg-neutral-100': selectedConditionId === rule.id,
        },
      )}
    >
      <span
        className={cn('invisible me-2 group-hover:visible', {
          'cursor-grab': !isDragging,
        })}
        {...listeners}
      >
        <MdOutlineDragIndicator />
      </span>
      <div className="flex-1 text-start">
        <span className="typography-body2">{rule.id}</span>
      </div>
    </button>
  );
}
