import { type FieldsTabGroup, fieldGroup, fieldIcons } from './fields-tab/fields';
import { useSchemaStore } from './state/schema.state';
import { useSettingsStore } from './state/settings.state';
import { isValidFieldType } from './utils';

const generateFieldItems = () => {
  const { fieldMap } = useSchemaStore.getState();
  const { isInputReusable, formInputs } = useSettingsStore.getState();
  const fields = Object.values(Object.fromEntries(fieldMap));
  const inputGroups: FieldsTabGroup = {
    id: 'input',
    label: 'Inputs',
    children: [],
  };

  const validFormInputs = formInputs?.filter((input) => isValidFieldType(input.type));

  if (validFormInputs?.length > 0) {
    for (const input of validFormInputs) {
      const isInputUsed = fields
        .filter((field) => 'form' in field)
        .some((field) => field.form.name === input.id);

      inputGroups.children.push({
        label: input.label,
        type: input.type,
        Icon: fieldIcons[input.type],
        formKey: input.id,
        disabled: !isInputReusable && isInputUsed,
      });
    }
  } else {
    inputGroups.children.push(...fieldGroup.inputs.children);
  }

  return [inputGroups, fieldGroup.static, fieldGroup.layout];
};

export default generateFieldItems;
