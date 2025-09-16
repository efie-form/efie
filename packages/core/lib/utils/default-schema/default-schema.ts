import type { FormSchema } from '../../types/form-schema.type';

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function generateId(length: number = 10) {
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const defaultSchema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        sys: { name: 'Page 1', type: 'page', id: 'GwBdzomJRf' },
        children: [],
        props: [
          {
            type: 'name',
            value: 'Page 1',
          },
        ],
      },
    ],
    rules: [],
  },
};

export default defaultSchema;
