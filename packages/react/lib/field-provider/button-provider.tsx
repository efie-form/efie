import { type ButtonFormField, PropertyType, type PropValueButtonAction } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ButtonFieldProps } from '../../types/field-props';
import { useFormContext } from '../form-context';
import { useFieldCondition } from '../hooks/use-field-condition';

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
  const { isVisible } = useFieldCondition(field.id);

  if (!Component) return null;

  // Check if field should be visible
  if (!isVisible) {
    return null;
  }

  const label = field.props.find(
    (prop): prop is { type: typeof PropertyType.LABEL; value: string } =>
      prop.type === PropertyType.LABEL,
  );
  const buttonAction = field.props.find(
    (prop): prop is { type: typeof PropertyType.BUTTON_ACTION; value: PropValueButtonAction } =>
      prop.type === PropertyType.BUTTON_ACTION,
  );

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
