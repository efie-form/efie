import defaultSchema from './default-schema';

const schema = {
  v1: defaultSchema,
} as const;

const getDefaultSchema = (version: keyof typeof schema) => {
  return schema[version] || defaultSchema;
};

export default getDefaultSchema;
