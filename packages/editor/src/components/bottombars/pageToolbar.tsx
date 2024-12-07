import { useFieldArray, useFormContext } from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';
import { useEffect } from 'react';
import { useSettingsStore } from '../../lib/state/settings.state.ts';
import { cn } from '../../lib/utils.ts';
import ToolbarButton from '../toolbars/ToolbarButton.tsx';
import { FaBars, FaPlus } from 'react-icons/fa';
import { getDefaultField } from '../../lib/getDefaultField.ts';

function PageToolbar() {
  const { watch, getValues } = useFormContext<FormSchema>();
  const { insert, fields } = useFieldArray({
    keyName: '_id',
    name: 'form.fields',
  });
  const { page, setPage } = useSettingsStore();
  const pages = watch('form.fields').filter((field) => field.type === 'page');

  useEffect(() => {
    const fields = getValues('form.fields');
    const pages = fields.filter((field) => field.type === 'page');
    if (pages.length === 0) {
      return setPage(null);
    }
    setPage(pages[0].id);
  }, []);

  const handleAddNewPage = () => {
    const newPage = getDefaultField({
      type: 'page',
      page: {
        name: `Page ${pages.length + 1}`,
      },
    });
    insert(fields.length, newPage);
  };

  return (
    <div className="flex px-6 py-2 gap-2 items-center">
      <div>
        <div className="flex bg-neutral-100/50 rounded-md overflow-hidden">
          <ToolbarButton onClick={handleAddNewPage} Icon={FaPlus} />
          <ToolbarButton Icon={FaBars} />
        </div>
      </div>
      <div className="flex">
        {pages.map((p) => (
          <div>
            <div
              key={p.id}
              className={cn(
                `cursor-pointer`,
                page === p.id ? 'bg-neutral-200/50' : 'hover:bg-neutral-200/25'
              )}
              onClick={() => setPage(p.id)}
            >
              <p className="whitespace-nowrap">{p.props.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageToolbar;
