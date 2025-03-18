import type { BuilderCustomInput } from '@efie-form/core';
import {
  fieldGroup,
  fieldIcons,
  type FieldsTabGroup,
} from './fields-tab/fields';
import { isValidFieldType } from './utils';

interface GenerateFieldItemsProps {
  formInputs: BuilderCustomInput[];
}

const generateFieldItems = ({ formInputs }: GenerateFieldItemsProps) => {
  const inputGroups: FieldsTabGroup = {
    id: 'input',
    label: 'Inputs',
    children: [],
  };

  const validFormInputs = formInputs.filter((input) =>
    isValidFieldType(input.type)
  );

  if (validFormInputs.length > 0) {
    for (const input of validFormInputs) {
      inputGroups.children.push({
        label: input.label,
        type: input.type,
        Icon: fieldIcons[input.type],
        formKey: input.id,
      });
    }
  } else {
    inputGroups.children.push(...fieldGroup.inputs.children);
  }

  return [inputGroups, fieldGroup.static, fieldGroup.layout];
};

export default generateFieldItems;
