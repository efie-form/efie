import type { ColumnFormField, RowFormField } from '@efie-form/core';
import { FieldType, PropertyType, SizeType } from '@efie-form/core';
import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import Button from '../../../components/elements/button';
import IconButton from '../../../components/elements/icon-button';
import { getNextFieldCount } from '../../../lib/generate-field-name';
import { getDefaultField } from '../../../lib/get-default-field';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { getFieldProp } from '../../../lib/utils';
import ColumnSettings from './column-settings';

const LAYOUT_PRESETS = [
  [100],
  [50, 50],
  [33.33, 33.33, 33.33],
  [25, 25, 25, 25],
  [33.33, 66.66],
  [66.66, 33.33],
];

interface RowSettingsProps {
  field: RowFormField;
}

function RowSettings({ field }: RowSettingsProps) {
  const { deleteField, updateField, schema } = useSchemaStore();
  const [currentTab, setCurrentTab] = useState(field.children?.[0]?.sys.id || '');

  const applyLayout = (columns: number[]) => {
    const newColumns: ColumnFormField[] = [];

    for (const [i, width] of columns.entries()) {
      const existingColumn = field.children[i];

      if (existingColumn) {
        const widthProp = getFieldProp(existingColumn, PropertyType.COLUMN_WIDTH);
        if (widthProp) {
          widthProp.value = { type: SizeType.PERCENTAGE, value: width };
        } else {
          existingColumn.props.push({
            type: PropertyType.COLUMN_WIDTH,
            value: { type: SizeType.PERCENTAGE, value: width },
          });
        }
        newColumns.push(existingColumn);
        continue;
      }

      const newColumn = getDefaultField({
        type: FieldType.COLUMN,
        column: { width },
        nextFieldCount: getNextFieldCount(schema),
      });

      newColumns.push(newColumn);
    }

    updateField(field.sys.id, {
      ...field,
      children: newColumns,
    });
    setCurrentTab(newColumns[0]?.sys.id || '');
  };

  const addColumn = () => {
    const avgWidth = Math.floor(100 / (field.children.length + 1));

    const newColumn = getDefaultField({
      type: FieldType.COLUMN,
      column: { width: avgWidth },
      nextFieldCount: getNextFieldCount(schema),
    });

    const newColumns = equalColumnWidths([...field.children, newColumn]);

    updateField(field.sys.id, {
      ...field,
      children: newColumns,
    });

    setCurrentTab(newColumn.sys.id);
  };

  const removeColumn = (index: number) => {
    if (index === -1 || field.children.length <= 1) return;

    const removedFieldId = field.children[index].sys.id;

    const newColumns = field.children.filter((_, i) => i !== index);

    deleteField(removedFieldId);

    updateField(field.sys.id, {
      ...field,
      children: equalColumnWidths(newColumns),
    });

    const prevFieldId = field.children[index - 1]?.sys.id;

    setCurrentTab(prevFieldId || newColumns[0]?.sys.id || '');
  };

  function equalColumnWidths(columns: ColumnFormField[]) {
    const widths = 100 / columns.length;
    return columns.map((col) => {
      const widthProp = getFieldProp(col, PropertyType.COLUMN_WIDTH);
      if (widthProp) {
        widthProp.value = { type: SizeType.PERCENTAGE, value: widths };
      } else {
        col.props.push({
          type: PropertyType.COLUMN_WIDTH,
          value: { type: SizeType.PERCENTAGE, value: widths },
        });
      }
      return col;
    });
  }

  return (
    <div>
      <div className="border-neutral-100 border-b p-4">
        <div className="grid grid-cols-2 gap-2">
          {LAYOUT_PRESETS.map((preset, index) => (
            <button type="button" key={index} onClick={() => applyLayout(preset)}>
              <div className="group flex h-10">
                {preset.map((width, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center border border-neutral-200 bg-neutral-100/50 text-center"
                    style={{ flex: width }}
                  >
                    <p className="typography-body4 invisible text-neutral-700 group-hover:visible">
                      {width}%
                    </p>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <Button onClick={addColumn} startIcon={FaPlus}>
            Add
          </Button>
          <IconButton
            Icon={FaTrash}
            variant="danger"
            disabled={field.children.length <= 1}
            onClick={() =>
              removeColumn(field.children.findIndex((col) => col.sys.id === currentTab))
            }
            className="ml-2"
          />
        </div>
      </div>

      <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
        <div className="flex w-full border-neutral-100 border-b">
          <Tabs.List className="flex flex-1 overflow-x-auto">
            {field.children.map((column, index) => (
              <Tabs.Trigger
                key={column.sys.id}
                value={column.sys.id}
                className="typography-body3 whitespace-nowrap border-primary border-b-2 border-opacity-0 px-4 py-2 text-neutral-700 transition-colors data-[state=active]:border-opacity-100 data-[state=active]:text-primary"
              >
                Column {index + 1}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>

        {field.children
          .filter((column) => column.sys.type === FieldType.COLUMN)
          .map((column) => (
            <Tabs.Content key={column.sys.id} value={column.sys.id}>
              <ColumnSettings field={column} />
            </Tabs.Content>
          ))}
      </Tabs.Root>
    </div>
  );
}

export default RowSettings;
