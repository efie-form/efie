import { useFormContext, useWatch } from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';
import { useEffect } from 'react';
import { useSettingsStore } from '../../lib/state/settings.state.ts';
import { cn } from '../../lib/utils.ts';

function PageToolbar() {
  const { watch, control, getValues } = useFormContext<FormSchema>();
  const watchAllFields = useWatch({
    control,
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
  }, [watchAllFields]);

  return (
    <div className="flex bg-primary-50 border-t border-t-primary-200 text-neutral-800 items-center">
      {pages.map((p) => (
        <div>
          <div
            key={p.id}
            className={cn(
              `px-4 py-2 cursor-pointer`,
              page === p.id ? 'bg-neutral-200/50' : 'hover:bg-neutral-200/25'
            )}
            onClick={() => setPage(p.id)}
          >
            <p>{p.props.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PageToolbar;
