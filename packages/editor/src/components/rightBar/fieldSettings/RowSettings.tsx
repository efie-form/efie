import type { FormFieldRow } from '@efie-form/core';
import type { FieldKeyPrefix } from '../../../lib/genFieldKey.ts';
import { getDefaultField } from '../../../lib/getDefaultField.ts';
import { useFieldArray } from 'react-hook-form';
import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';
import ColumnSettings from './ColumnSettings.tsx';
import genFieldKey from '../../../lib/genFieldKey.ts';
import Button from '../../elements/Button.tsx';
import { FaPlus } from 'react-icons/fa6';

const LAYOUT_PRESETS = [
  [100],
  [50, 50],
  [33.33, 33.33, 33.33],
  [25, 25, 25, 25],
];

interface RowSettingsProps {
  field: FormFieldRow;
  fieldKey: FieldKeyPrefix;
}

function RowSettings({ field, fieldKey }: RowSettingsProps) {
  const [currentTab, setCurrentTab] = useState(field.children[0]?.id);
  const { remove, replace } = useFieldArray({
    name: `${fieldKey}.children`,
  });

  const applyLayout = (columns: number[]) => {
    const newColumns = columns.map((width, index) => {
      const existingColumn = field.children[index];
      return {
        ...getDefaultField({
          type: 'column',
          column: { width },
        }),
        children: existingColumn?.children || [],
      };
    });

    replace(newColumns);
    setCurrentTab(newColumns[0].id);
  };

  const addColumn = () => {
    const avgWidth = Math.floor(100 / (field.children.length + 1));

    // Create array with all columns including the new one
    const newColumns = [
      ...field.children.map((column) => ({
        ...column,
        props: {
          ...column.props,
          width: avgWidth,
        },
      })),
      {
        ...getDefaultField({
          type: 'column',
          column: {
            width: avgWidth,
          },
        }),
        children: [],
      },
    ];

    // Replace all columns at once
    replace(newColumns);

    // Set focus to the new column
    setCurrentTab(newColumns[newColumns.length - 1].id);
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
      <div className="p-4 border-b border-neutral-100">
        <div className="grid grid-cols-2 gap-2">
          {LAYOUT_PRESETS.map((preset, index) => (
            <button key={index} onClick={() => applyLayout(preset)}>
              <div className="flex h-10 group">
                {preset.map((width, i) => (
                  <div
                    key={i}
                    className="bg-neutral-100/50 border border-neutral-200 text-center flex items-center justify-center"
                    style={{ flex: width }}
                  >
                    <p className="typography-body4 text-neutral-700 invisible group-hover:visible">
                      {width}%
                    </p>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Button onClick={addColumn} StartIcon={FaPlus}>
            Add Column
          </Button>
        </div>
      </div>

      <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
        <div className="w-full flex border-b border-neutral-100">
          <Tabs.List className="flex-1 flex overflow-x-auto">
            {field.children.map((column, index) => (
              <Tabs.Trigger
                key={index}
                value={column.id}
                className="px-4 py-2 whitespace-nowrap border-b-2 border-primary border-opacity-0 transition-colors data-[state=active]:border-opacity-100 typography-body3 text-neutral-700 data-[state=active]:text-primary"
              >
                Column {index + 1}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
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
