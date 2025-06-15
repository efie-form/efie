# Vue Form Builder Demo

A demonstration application showcasing the [@efie-form/vue](../../../packages/vue) and [@efie-form/builder](../../../packages/builder) packages in a Vue.js environment.

> **Note**: This demo is currently under development and will be available when the [@efie-form/vue](../../../packages/vue) package is released.

## Planned Features

- 🎨 **Visual Form Builder**: Vue.js integration with the drag-and-drop form builder
- 🔄 **Composition API**: Built with Vue 3 Composition API
- 📱 **Responsive Design**: Optimized for all screen sizes
- 💾 **Schema Management**: Save and load form schemas
- ⚡ **Reactive**: Leverages Vue's reactivity system
- 🎯 **TypeScript Support**: Full TypeScript integration

## Getting Started (Coming Soon)

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- Vue 3.0+

### Installation

```bash
# From the project root
pnpm install

# Or install dependencies for this demo specifically
cd demo/vue/builder
pnpm install
```

### Development

```bash
# Start the development server
pnpm dev
```

The demo will be available at `http://localhost:5175`

## Planned Usage

### Basic Form Builder Setup

```vue
<template>
  <div class="app">
    <header>
      <button @click="handleSave">Save Form</button>
      <button @click="handleLoad">Load Form</button>
    </header>
    
    <FormBuilder
      v-model:schema="formSchema"
      @schema-change="onSchemaChange"
      @field-add="onFieldAdd"
      @field-remove="onFieldRemove"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FormBuilder, type FormSchema } from '@efie-form/vue';

const formSchema = ref<FormSchema>({
  fields: [],
  layout: { blocks: [] }
});

const handleSave = () => {
  console.log('Form schema:', formSchema.value);
  // Save to backend
};

const handleLoad = () => {
  // Load existing schema
  formSchema.value = existingSchema;
};

const onSchemaChange = (schema: FormSchema) => {
  console.log('Schema changed:', schema);
};

const onFieldAdd = (field) => {
  console.log('Field added:', field);
};

const onFieldRemove = (fieldId: string) => {
  console.log('Field removed:', fieldId);
};
</script>
```

### Using Composables

```vue
<script setup lang="ts">
import { 
  useFormBuilder,
  useFormValidation,
  useFormSettings
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
  canRedo,
  selectedFieldId
} = useFormBuilder();

// Validation composable
const {
  errors,
  isValid,
  validate,
  validateField
} = useFormValidation(schema);

// Settings composable
const {
  settings,
  updateSetting,
  resetSettings
} = useFormSettings();
</script>

<template>
  <div class="form-builder">
    <!-- Toolbar -->
    <div class="toolbar">
      <button @click="undo" :disabled="!canUndo">Undo</button>
      <button @click="redo" :disabled="!canRedo">Redo</button>
      <button @click="validate">Validate</button>
    </div>
    
    <!-- Builder Interface -->
    <FormBuilder v-model:schema="schema" />
    
    <!-- Validation Errors -->
    <div v-if="errors.length" class="errors">
      <h3>Validation Errors:</h3>
      <ul>
        <li v-for="error in errors" :key="error.field">
          {{ error.message }}
        </li>
      </ul>
    </div>
  </div>
</template>
```

## Tech Stack

- **Vue 3**: Progressive JavaScript framework
- **TypeScript**: Type safety and better DX
- **Vite**: Build tool and dev server
- **Pinia**: State management (if needed)
- **@efie-form/vue**: Vue form components
- **@efie-form/builder**: Form builder core

## File Structure

```
demo/vue/builder/
├── public/              # Static assets
├── src/
│   ├── components/      # Demo components
│   ├── composables/     # Vue composables
│   ├── stores/          # Pinia stores (if needed)
│   ├── utils/           # Utility functions
│   ├── App.vue          # Main application
│   ├── main.ts          # Entry point
│   └── style.css        # Global styles
├── package.json
├── tsconfig.json        # TypeScript config
└── vite.config.ts       # Vite configuration
```

## Development Status

- [x] Project setup and configuration
- [ ] Vue 3 integration
- [ ] Form builder component integration
- [ ] Composition API implementation
- [ ] Demo UI components
- [ ] Documentation and examples
- [ ] Testing setup

## Stay Updated

To be notified when this demo is available:

1. Star the [main repository](https://github.com/pwkang/efie)
2. Watch for releases on GitHub
3. Follow development in [GitHub Discussions](https://github.com/pwkang/efie/discussions)

## Contributing

Even though this demo is under development, you can contribute by:

- Reviewing the planned Vue.js integration approach
- Suggesting Vue-specific features and patterns
- Testing early preview versions
- Contributing to Vue component design

## Related Demos

- [React Builder Demo](../../react/builder) - React version (available now)
- [React Form Demo](../../react/form) - Form rendering demo
- [Vue Form Demo](../form) - Vue form rendering (coming soon)

## License

MIT License - see the [LICENSE](../../../LICENSE) file for details.
