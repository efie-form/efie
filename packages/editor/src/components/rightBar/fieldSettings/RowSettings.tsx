import type { FormFieldRow } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';
import { getDefaultField } from '../../../lib/getDefaultField.ts';
import { useFieldArray } from 'react-hook-form';
import * as Tabs from '@radix-ui/react-tabs';
import { HiPlus } from 'react-icons/hi2';
import { useState } from 'react';
import ColumnSettings from './ColumnSettings.tsx';
import genFieldKey from '../../../lib/genFieldKey.ts';

const DEFAULT_LAYOUTS = [
  [100],
  [50, 50],
  [33, 33, 33],
  [25, 25, 25, 25],
  [20, 20, 20, 20, 20],
];

interface RowSettingsProps {
  field: FormFieldRow;
  fieldKey: FieldKeyPrefix;
}

function RowSettings({ field, fieldKey }: RowSettingsProps) {
  const [currentTab, setCurrentTab] = useState(field.children[0]?.id);
  console.log(field, currentTab);

  const { append, remove } = useFieldArray({
    name: `${fieldKey}.children`,
  });

  const addColumn = () => {
    const avgWidth = Math.floor(100 / field.children.length + 1) ;
    append(
      getDefaultField({
        type: 'column',
        column: {
          width: avgWidth,
        },
      })
    );
  };

  const removeColumn = (index: number) => {
    const prevField = field.children[index - 1];
    if (index !== -1) {
      remove(index);
      setCurrentTab(prevField?.id || field.children[0]?.id);
    }
  };

  return (
    <div>
      <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
        <div className="w-full flex border-b border-neutral-100">
          <Tabs.List className="flex-1 flex overflow-x-auto">
            {field.children.map((column, index) => (
              <Tabs.Trigger
                key={index}
                value={column.id}
                className="px-4 py-2 whitespace-nowrap border-b-2 border-primary border-opacity-0 transition-colors data-[state=active]:border-opacity-100 typography-body3"
              >
                Column {index + 1}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <div className="flex items-center gap-2 px-2">
            <button
              className="p-1 bg-neutral-200 rounded-full text-white"
              onClick={addColumn}
            >
              <HiPlus />
            </button>
          </div>
        </div>

        {field.children.map((column, index) => (
          <Tabs.Content key={index} value={column.id}>
            <ColumnSettings
              field={column}
              fieldKey={genFieldKey(fieldKey, `children.${index}`)}
              onRemove={() => removeColumn(index)}
            />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}

export default RowSettings;
