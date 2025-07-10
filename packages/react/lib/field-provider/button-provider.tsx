import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ButtonFieldProps } from '../../types/field-props';
import { PropertyType, type ButtonFormField } from '@efie-form/core';
import { useFormContext } from '../form-context';

interface ButtonProviderProps {
  field: ButtonFormField;
  Component?: ElementType<ButtonFieldProps>;
}

const buttonType = {
  submit: 'submit',
  hyperlink: 'button',
  navigate: 'button',
} as const;

function ButtonProvider({ field, Component }: ButtonProviderProps) {
  const { setPage } = useFormContext();

  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);
  const buttonAction = field.props.find(prop => prop.type === PropertyType.BUTTON_ACTION);

  const handleClick = () => {
    if (buttonAction?.value.action !== 'navigate') return;

    const pageId = buttonAction.value.pageId;
    if (!pageId) return;
    setPage(pageId);
  };

  const getButtonAction = () => {
    if (buttonAction?.value.action === 'hyperlink') {
      return {
        hyperlink: {
          href: buttonAction.value.url || '',
          target: buttonAction.value.target || '_self',
        },
      };
    }
    if (buttonAction?.value.action === 'navigate') {
      return {
        onClick: handleClick,
      };
    }
    return {
      onClick: handleClick,
    };
  };

  return createElement(Component, {
    id: field.id,
    field,
    label: label?.value || '',
    buttonType: buttonAction ? buttonType[buttonAction.value.action] : 'button',
    ...getButtonAction(),
  } satisfies ButtonFieldProps);
}

export default ButtonProvider;
