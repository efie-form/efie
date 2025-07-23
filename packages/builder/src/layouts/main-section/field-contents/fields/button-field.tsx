import { type ButtonFormField, PropertyType } from '@efie-form/core';
import IconExternal from '../../../../components/icons/icon-external';
import { getFieldProp } from '../../../../lib/utils';

interface ButtonFieldProps {
  field: ButtonFormField;
}

function ButtonField({ field }: ButtonFieldProps) {
  const label = getFieldProp(field, PropertyType.LABEL);
  const action = getFieldProp(field, PropertyType.BUTTON_ACTION);

  const buttonClassName =
    'bg-primary text-white bg-primary typography-body1 rounded-md px-3 py-1.5';

  return (
    <div className="flex justify-center p-2">
      {action?.value.action === 'hyperlink' ? (
        <a
          href={action.value.url}
          target={action.value.target || '_self'}
          rel={action.value.target === '_blank' ? 'noopener noreferrer' : undefined}
          className={buttonClassName}
        >
          <span className="flex items-center gap-2">
            {label?.value}
            {action.value.target === '_blank' && (
              <span aria-hidden="true">
                <IconExternal />
              </span>
            )}
          </span>
        </a>
      ) : (
        <button className={buttonClassName} type="button">
          {label?.value}
        </button>
      )}
    </div>
  );
}

export default ButtonField;
