# @efie-form/vue

[![Version](https://img.shields.io/npm/v/@efie-form/vue.svg?style=flat-square)](https://npmjs.com/package/@efie-form/vue)
[![License](https://img.shields.io/npm/l/@efie-form/vue.svg?style=flat-square)](https://npmjs.com/package/@efie-form/vue)
[![Downloads](https://img.shields.io/npm/dm/@efie-form/vue.svg?style=flat-square)](https://npmjs.com/package/@efie-form/vue)

Vue 3 components for building and rendering dynamic forms. Part of the [Efie Form](https://github.com/pwkang/efie) ecosystem.

> **Note**: This package is currently under active development and will be available soon. The API may change before the stable release.

## Features (Coming Soon)

- 🧩 **Form Builder**: Vue components for the visual form builder
- 📝 **Form Renderer**: Render forms from JSON schemas
- 🔌 **Composition API**: Built with Vue 3 Composition API
- 🎯 **TypeScript Support**: Full TypeScript support with comprehensive types
- 🎨 **Themeable**: Customizable styling with CSS variables
- 🌐 **Responsive**: Mobile-first responsive design
- 🔄 **Reactive**: Leverages Vue's reactivity system
- 🧰 **Rich Field Types**: Support for all HTML5 input types and custom components

## Planned Installation

```bash
# With npm
npm install @efie-form/vue

# With yarn
yarn add @efie-form/vue

# With pnpm
pnpm add @efie-form/vue
```

## Planned API

### Form Builder (Coming Soon)

```vue
<template>
  <FormBuilder
    v-model:schema="formSchema"
    @field-add="onFieldAdd"
    @field-remove="onFieldRemove"
    @schema-change="onSchemaChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FormBuilder, type FormSchema } from '@efie-form/vue';

const formSchema = ref<FormSchema>({
  fields: [],
  layout: { blocks: [] }
});

const onFieldAdd = (field) => {
  console.log('Field added:', field);
};

const onFieldRemove = (fieldId) => {
  console.log('Field removed:', fieldId);
};

const onSchemaChange = (schema) => {
  console.log('Schema changed:', schema);
};
</script>
```

### Form Renderer (Coming Soon)

```vue
<template>
  <Form
    :schema="formSchema"
    v-model="formData"
    @submit="onSubmit"
    @validate="onValidate"
  />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Form, type FormSchema } from '@efie-form/vue';

const formSchema = ref<FormSchema>({
  fields: [
    {
      id: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
      props: {
        placeholder: 'Enter your full name'
      }
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      required: true
    }
  ],
  layout: {
    blocks: [
      {
        id: 'block-1',
        rows: [
          {
            id: 'row-1',
            columns: [
              { id: 'col-1', fieldIds: ['name'] },
              { id: 'col-2', fieldIds: ['email'] }
            ]
          }
        ]
      }
    ]
  }
});

const formData = reactive({});

const onSubmit = (data) => {
  console.log('Form submitted:', data);
};

const onValidate = (errors) => {
  console.log('Validation errors:', errors);
};
</script>
```

### Composables (Coming Soon)

```vue
<script setup lang="ts">
import { 
  useFormBuilder,
  useFormRenderer,
  useFormValidation,
  useFieldProps
} from '@efie-form/vue';

// Form builder composable
const {
  schema,
  addField,
  removeField,
  updateField,
  undo,
  redo,
  canUndo,
  canRedo
} = useFormBuilder();

// Form renderer composable
const {
  formData,
  errors,
  isValid,
  validate,
  submit,
  reset
} = useFormRenderer(schema);

// Field validation composable
const {
  validateField,
  getFieldError,
  clearFieldError
} = useFormValidation();

// Field props composable
const {
  getFieldProps,
  updateFieldProps
} = useFieldProps();
</script>
```

## Vue 3 Features

This package will leverage Vue 3's modern features:

- **Composition API**: All components built with the Composition API
- **Teleport**: Modal dialogs and overlays use Vue's Teleport
- **Suspense**: Async form loading with Suspense boundaries
- **Reactivity**: Deep integration with Vue's reactivity system
- **TypeScript**: Full TypeScript support with proper type inference

## Compatibility

- Vue 3.0+
- TypeScript 4.5+
- Modern browsers (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)

## Development Status

This package is currently in development. Key milestones:

- [x] Project setup and configuration
- [ ] Core form rendering components
- [ ] Form builder integration
- [ ] Validation system
- [ ] Documentation and examples
- [ ] Beta release
- [ ] Stable release

## Stay Updated

To be notified when this package is released:

1. Star the [main repository](https://github.com/pwkang/efie)
2. Watch for releases on GitHub
3. Follow development progress in the [discussions](https://github.com/pwkang/efie/discussions)

## Related Packages

- [@efie-form/core](../core) - Core utilities and types
- [@efie-form/builder](../builder) - Visual form builder
- [@efie-form/react](../react) - React components (available now)

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions! See the main [Contributing Guidelines](../../CONTRIBUTING.md) for information on how to contribute to this package.

Even though the package is under development, you can help by:

- Reviewing the planned API design
- Suggesting Vue-specific features
- Testing early preview versions
- Contributing to documentation
