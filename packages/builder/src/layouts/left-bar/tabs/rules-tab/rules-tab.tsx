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
import { PropertyType } from '@efie-form/core';
import { useMemo } from 'react';
import { FaPlus } from 'react-icons/fa6';
import Button from '../../../../components/elements/button';
import { FIELDS_NAME } from '../../../../lib/constant';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { getAllFields } from '../../../../lib/state/schema.state/utils';
import { cn, getFieldProp } from '../../../../lib/utils';
import { RuleItem } from './rule-item';

function RulesTab() {
  const allRules = useSchemaStore((state) => state.getAllRules());
  const fieldsTree = useSchemaStore((state) => state.schema?.form.fields);
  const flatFields = useMemo(() => (fieldsTree ? getAllFields(fieldsTree) : []), [fieldsTree]);
  const fieldLabelMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const f of flatFields) {
      const label =
        (getFieldProp(f, PropertyType.LABEL)?.value as string | undefined) ||
        `${FIELDS_NAME[f.type]} #${f.id}`;
      map.set(f.id, label);
    }
    return map;
  }, [flatFields]);
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
        children: [
          {
            left: { kind: 'fieldValue', field: '' },
            operator: 'equal',
          },
        ],
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
                <RuleItem rule={r} fieldLabelMap={fieldLabelMap} />
              </li>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default RulesTab;
