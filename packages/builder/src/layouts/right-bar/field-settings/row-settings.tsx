import type { ColumnFormField, RowFormField } from '@efie-form/core';
import { FieldType, PropertyType, SizeType } from '@efie-form/core';
import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import Button from '../../../components/elements/button';
import IconButton from '../../../components/elements/icon-button';
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
  const { getFieldById, replaceFieldChildren } = useSchemaStore();
  const [currentTab, setCurrentTab] = useState(field.children?.[0]?.id || '');

  const applyLayout = (columns: number[]) => {
    const newColumns: ColumnFormField[] = [];

    for (const [i, width] of columns.entries()) {
      const existingColumn = field.children[i];

      if (existingColumn) {
        const widthProp = getFieldProp(existingColumn, PropertyType.WIDTH);
        if (widthProp) {
          widthProp.value = { type: SizeType.PERCENTAGE, value: width };
        } else {
          existingColumn.props.push({
            type: PropertyType.WIDTH,
            value: { type: SizeType.PERCENTAGE, value: width },
          });
        }
        newColumns.push(existingColumn);
        continue;
      }

      const newColumn = getDefaultField({
        type: FieldType.COLUMN,
        column: { width },
      });

      newColumns.push(newColumn);
    }

    replaceFieldChildren(field.id, newColumns);
    setCurrentTab(newColumns[0]?.id || '');
  };

  const addColumn = () => {
    const avgWidth = Math.floor(100 / (field.children.length + 1));

    const newColumn = getDefaultField({
      type: FieldType.COLUMN,
      column: { width: avgWidth },
    });

    const newColumns = [];

    for (const col of field.children) {
      const colField = getFieldById(col.id);
      if (!colField || colField.type !== FieldType.COLUMN) return col;

      const widthProp = getFieldProp(colField, PropertyType.WIDTH);
      if (widthProp) {
        widthProp.value = { type: SizeType.PERCENTAGE, value: avgWidth };
      } else {
        colField.props.push({
          type: PropertyType.WIDTH,
          value: { type: SizeType.PERCENTAGE, value: avgWidth },
        });
      }

      newColumns.push(colField);
    }

    newColumns.push(newColumn);

    replaceFieldChildren(field.id, newColumns);

    setCurrentTab(newColumn.id);
  };

  const removeColumn = (index: number) => {
    if (index === -1 || field.children.length <= 1) return;

    const removedFieldId = field.children[index].id;

    const newColumns = [];

    for (const col of field.children) {
      const colField = getFieldById(col.id);
      if (!colField || colField.type !== FieldType.COLUMN || colField.id === removedFieldId) {
        continue;
      }

      const widthProp = getFieldProp(colField, PropertyType.WIDTH);
      const width = Math.floor(100 / (field.children.length - 1));
      if (widthProp) {
        widthProp.value = {
          type: SizeType.PERCENTAGE,
          value: width,
        };
      } else {
        colField.props.push({
          type: PropertyType.WIDTH,
          value: { type: SizeType.PERCENTAGE, value: width },
        });
      }

      newColumns.push(colField);
    }

    replaceFieldChildren(field.id, newColumns);

    const prevFieldId = field.children[index - 1]?.id;

    setCurrentTab(prevFieldId || newColumns[0]?.id || '');
  };

  return (
    <div>
      <div className="p-4 border-b border-neutral-100">
        <div className="grid grid-cols-2 gap-2">
          {LAYOUT_PRESETS.map((preset, index) => (
            <button type="button" key={index} onClick={() => applyLayout(preset)}>
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
        <div className="flex justify-center mt-4 gap-2">
          <Button onClick={addColumn} startIcon={FaPlus}>
            Add
          </Button>
          <IconButton
            Icon={FaTrash}
            variant="danger"
            disabled={field.children.length <= 1}
            onClick={() => removeColumn(field.children.findIndex((col) => col.id === currentTab))}
            className="ml-2"
          />
        </div>
      </div>

      <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
        <div className="w-full flex border-b border-neutral-100">
          <Tabs.List className="flex-1 flex overflow-x-auto">
            {field.children.map((column, index) => (
              <Tabs.Trigger
                key={column.id}
                value={column.id}
                className="px-4 py-2 whitespace-nowrap border-b-2 border-primary border-opacity-0 transition-colors data-[state=active]:border-opacity-100 typography-body3 text-neutral-700 data-[state=active]:text-primary"
              >
                Column {index + 1}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>

        {field.children
          .filter((column) => column.type === FieldType.COLUMN)
          .map((column) => (
            <Tabs.Content key={column.id} value={column.id}>
              <ColumnSettings field={column} />
            </Tabs.Content>
          ))}
      </Tabs.Root>
    </div>
  );
}

export default RowSettings;
