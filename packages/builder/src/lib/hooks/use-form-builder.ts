import { FieldType, type FormSchema, validateSchema } from '@efie-form/core';
import { useSchemaStore } from '../state/schema.state';
import { useSettingsStore } from '../state/settings.state';

export default function useFormBuilder() {
  const { setPage, setFormInputs, setHeight, setFieldNameEditable, setIsInputReusable } =
    useSettingsStore();
  const { schema, setSchema, setMaxHistories } = useSchemaStore();

  const getSchema = () => {
    return schema;
  };

  const resetSchema = (data: FormSchema) => {
    setSchema(data);
    validateSchema(data);
    const firstPage = data.form.fields.find((field) => field.sys.type === FieldType.PAGE);
    if (firstPage) {
      setPage(firstPage.sys.id);
    }
  };

  return {
    getSchema,
    setFormInputs,
    resetSchema,
    setHeight,
    setFieldNameEditable,
    setIsInputReusable,
    setMaxHistories,
  };
}
